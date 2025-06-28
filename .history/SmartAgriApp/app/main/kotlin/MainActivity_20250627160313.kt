package com.techharvesters.smartagriapp

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.google.android.material.bottomnavigation.BottomNavigationView
import androidx.fragment.app.Fragment

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val bottomNav = findViewById<BottomNavigationView>(R.id.bottom_navigation)
        bottomNav.setOnNavigationItemSelectedListener { item ->
            when (item.itemId) {
                R.id.nav_dashboard -> switchFragment(DashboardFragment())
                R.id.nav_iot -> switchFragment(IoTSensorFragment())
                R.id.nav_crop -> switchFragment(CropRecommendationFragment())
                R.id.nav_disease -> switchFragment(DiseaseDetectionFragment())
                R.id.nav_irrigation -> switchFragment(IrrigationAlertFragment())
                R.id.nav_marketplace -> switchFragment(MarketplaceFragment())
                else -> false
            }
        }
        // Set default fragment
        if (savedInstanceState == null) {
            switchFragment(DashboardFragment())
        }
    }

    private fun switchFragment(fragment: Fragment): Boolean {
        supportFragmentManager.beginTransaction()
            .replace(R.id.fragment_container, fragment)
            .commit()
        return true
    }
} 