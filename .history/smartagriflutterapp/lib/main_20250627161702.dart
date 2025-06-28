import 'package:flutter/material.dart';

void main() {
  runApp(SmartAgriApp());
}

class SmartAgriApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Smart Agri App',
      theme: ThemeData(
        primarySwatch: Colors.green,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: MainScreen(),
    );
  }
}

class MainScreen extends StatefulWidget {
  @override
  _MainScreenState createState() => _MainScreenState();
}

class _MainScreenState extends State<MainScreen> {
  int _selectedIndex = 0;
  static const List<Widget> _pages = <Widget>[
    DashboardPage(),
    IoTSensorPage(),
    CropRecommendationPage(),
    DiseaseDetectionPage(),
    IrrigationAlertPage(),
    MarketplacePage(),
  ];

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _pages[_selectedIndex],
      bottomNavigationBar: BottomNavigationBar(
        type: BottomNavigationBarType.fixed,
        items: const <BottomNavigationBarItem>[
          BottomNavigationBarItem(
            icon: Icon(Icons.dashboard),
            label: 'Dashboard',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.sensors),
            label: 'IoT',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.agriculture),
            label: 'Crops',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.healing),
            label: 'Disease',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.water),
            label: 'Irrigation',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.store),
            label: 'Marketplace',
          ),
        ],
        currentIndex: _selectedIndex,
        selectedItemColor: Colors.green,
        onTap: _onItemTapped,
      ),
    );
  }
}

class DashboardPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Center(child: Text('Dashboard', style: TextStyle(fontSize: 32)));
  }
}

class IoTSensorPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Center(child: Text('IoT Sensors', style: TextStyle(fontSize: 32)));
  }
}

class CropRecommendationPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Center(child: Text('Crop Recommendation', style: TextStyle(fontSize: 32)));
  }
}

class DiseaseDetectionPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Center(child: Text('Disease Detection', style: TextStyle(fontSize: 32)));
  }
}

class IrrigationAlertPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Center(child: Text('Irrigation Alert', style: TextStyle(fontSize: 32)));
  }
}

class MarketplacePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Center(child: Text('Marketplace', style: TextStyle(fontSize: 32)));
  }
}
