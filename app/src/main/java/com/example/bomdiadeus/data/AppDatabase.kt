package com.example.bomdiadeus.data

import android.content.Context
import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase
import androidx.sqlite.db.SupportSQLiteDatabase
import com.example.bomdiadeus.model.Verse
import com.example.bomdiadeus.util.BibleVerses
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

/**
 * Banco de dados principal do aplicativo.
 * Armazena os versículos bíblicos.
 */
@Database(entities = [Verse::class], version = 1, exportSchema = false)
abstract class AppDatabase : RoomDatabase() {

    abstract fun verseDao(): VerseDao

    companion object {
        @Volatile
        private var INSTANCE: AppDatabase? = null

        fun getDatabase(context: Context): AppDatabase {
            return INSTANCE ?: synchronized(this) {
                val instance = Room.databaseBuilder(
                    context.applicationContext,
                    AppDatabase::class.java,
                    "bomdiadeus_database"
                )
                .fallbackToDestructiveMigration()
                .addCallback(object : RoomDatabase.Callback() {
                    override fun onCreate(db: SupportSQLiteDatabase) {
                        super.onCreate(db)
                        // Pré-carregar os versículos no banco quando for criado pela primeira vez
                        INSTANCE?.let { database ->
                            CoroutineScope(Dispatchers.IO).launch {
                                preloadDatabase(database.verseDao())
                            }
                        }
                    }
                })
                .build()
                
                INSTANCE = instance
                instance
            }
        }

        /**
         * Pré-carrega o banco de dados com os versículos bíblicos.
         */
        private suspend fun preloadDatabase(verseDao: VerseDao) {
            // Verificar se o banco de dados já contém versículos
            if (verseDao.getVerseCount() == 0) {
                // Carregar os versículos da classe utilitária BibleVerses
                val verses = BibleVerses.getAll()
                verseDao.insertAll(verses)
            }
        }
    }
}
