package com.example.bomdiadeus.data

import androidx.lifecycle.LiveData
import androidx.room.Dao
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import androidx.room.Query
import com.example.bomdiadeus.model.Verse

/**
 * Interface de acesso ao banco de dados para os versículos.
 */
@Dao
interface VerseDao {
    
    /**
     * Insere uma lista de versículos no banco de dados.
     * Se um versículo já existir (mesmo dayOfYear), ele será substituído.
     */
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertAll(verses: List<Verse>)
    
    /**
     * Obtém todos os versículos ordenados por dia do ano.
     */
    @Query("SELECT * FROM verses ORDER BY dayOfYear ASC")
    fun getAllVerses(): LiveData<List<Verse>>
    
    /**
     * Obtém o versículo correspondente a um dia específico do ano.
     */
    @Query("SELECT * FROM verses WHERE dayOfYear = :dayOfYear LIMIT 1")
    suspend fun getVerseByDayOfYear(dayOfYear: Int): Verse?
    
    /**
     * Obtém versículos correspondentes a um determinado mês (1-12).
     */
    @Query("SELECT * FROM verses WHERE dayOfYear >= :firstDayOfMonth AND dayOfYear <= :lastDayOfMonth ORDER BY dayOfYear ASC")
    fun getVersesByMonth(firstDayOfMonth: Int, lastDayOfMonth: Int): LiveData<List<Verse>>
    
    /**
     * Conta quantos versículos existem no banco de dados.
     */
    @Query("SELECT COUNT(*) FROM verses")
    suspend fun getVerseCount(): Int
} 