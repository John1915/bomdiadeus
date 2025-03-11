package com.example.bomdiadeus.model

import androidx.room.Entity
import androidx.room.PrimaryKey
import java.text.SimpleDateFormat
import java.util.*

/**
 * Classe modelo que representa um versículo bíblico.
 */
@Entity(tableName = "verses")
data class Verse(
    @PrimaryKey
    val dayOfYear: Int, // Dia do ano (1-365)
    val text: String,   // Texto do versículo
    val reference: String // Referência bíblica (ex: "João 3:16")
) {
    /**
     * Retorna a data formatada como "dd 'de' MMMM" com base no dia do ano.
     */
    fun getFormattedDate(): String {
        val calendar = Calendar.getInstance()
        val currentYear = calendar.get(Calendar.YEAR)
        calendar.set(currentYear, 0, 1)
        calendar.add(Calendar.DAY_OF_YEAR, dayOfYear - 1)
        
        val dateFormat = SimpleDateFormat("dd 'de' MMMM", Locale("pt", "BR"))
        return dateFormat.format(calendar.time)
    }
    
    /**
     * Retorna o mês (1-12) com base no dia do ano.
     */
    fun getMonth(): Int {
        val calendar = Calendar.getInstance()
        val currentYear = calendar.get(Calendar.YEAR)
        calendar.set(currentYear, 0, 1)
        calendar.add(Calendar.DAY_OF_YEAR, dayOfYear - 1)
        return calendar.get(Calendar.MONTH) + 1
    }
    
    /**
     * Retorna o dia do mês (1-31) com base no dia do ano.
     */
    fun getDayOfMonth(): Int {
        val calendar = Calendar.getInstance()
        val currentYear = calendar.get(Calendar.YEAR)
        calendar.set(currentYear, 0, 1)
        calendar.add(Calendar.DAY_OF_YEAR, dayOfYear - 1)
        return calendar.get(Calendar.DAY_OF_MONTH)
    }
    
    companion object {
        /**
         * Retorna o dia do ano (1-365) com base no mês e dia.
         */
        fun getDayOfYear(month: Int, day: Int): Int {
            val calendar = Calendar.getInstance()
            val currentYear = calendar.get(Calendar.YEAR)
            calendar.set(currentYear, month - 1, day)
            return calendar.get(Calendar.DAY_OF_YEAR)
        }
        
        /**
         * Retorna o dia do ano atual (1-365).
         */
        fun getCurrentDayOfYear(): Int {
            return Calendar.getInstance().get(Calendar.DAY_OF_YEAR)
        }
    }
} 