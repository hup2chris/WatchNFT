import 'package:flutter/material.dart';
import 'package:watch_nft_app/cg_screen.dart';
import 'package:watch_nft_app/about.dart';

void main() {
  runApp(WatchNFT());
}

class WatchNFT extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData.dark().copyWith(
          primaryColor: Colors.blueGrey,
          scaffoldBackgroundColor: Colors.white),
      initialRoute: PriceScreen.id,
      routes: {
        PriceScreen.id: (context) => PriceScreen(),
        About.id: (context) => About(),
      },
      debugShowCheckedModeBanner: false,
    );
  }
}