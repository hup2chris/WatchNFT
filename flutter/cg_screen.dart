import 'package:flutter/material.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter_spinkit/flutter_spinkit.dart';
import 'package:wear/wear.dart';
import 'package:web3dart/web3dart.dart' as web3;
import 'package:flutter/services.dart';
import 'package:http/http.dart';

Color vmcol = Colors.black;
const wallet1 = "0xc63f3edf0ccbc286922fd39562d6347f4ac15911";
const wallet2 = "0xD814E14Fa07660cB9C101Cb2493897dCa5De0198";
web3.EthereumAddress address =
    web3.EthereumAddress.fromHex("0xc63f3edf0ccbc286922fd39562d6347f4ac15911");
//const wallet = wallet2;
var wallet = address;

var ccAllAPIURL =
    'https://eth-mainnet.g.alchemy.com/nft/v2/YOUR_API_KEY/getNFTs?owner=$wallet';
//const apiKey = kApiKey;

String gtUrl = 'https://hup2.com';
String loadedNFT = 'No';
List<String> cc = [];
TasksList tl = TasksList(cc);
String selectedAddress = "";
//Web3Provider web3;

// TODO: Add _isInterstitialAdReady
//bool _isInterstitialAdReady = false;

@override
void dispose() {
  //_interstitialAd.dispose();
  // super.dispose();
}

class PriceScreen extends StatefulWidget {
  static const String id = 'Price_Screen';

  @override
  _PriceScreenState createState() => _PriceScreenState();
}

class _PriceScreenState extends State<PriceScreen> {
  String selectedFv = 'BTC';
  String loaded = 'No';

  //String value = '?';
  Map value = {};
  //String address = '0xD814E14Fa07660cB9C101Cb2493897dCa5De0198';
  //String address = '0xc63f3edf0ccbc286922fd39562d6347f4ac15911';
  //web3.EthereumAddress address = "0xc63f3edf0ccbc286922fd39562d6347f4ac15911";
  late Client httpClient;
  late web3.Web3Client ethClient;

  void getData() async {
    try {
      //Map data = await CoinData().getCoinData();//selectedCurrency);

      List<dynamic> result = await query("getWallet", []);
      print(result[0]);
      address = result[0];
      ccAllAPIURL =
          'https://eth-mainnet.g.alchemy.com/nft/v2/YOUR_API_KEY/getNFTs?owner=$address';
      Map data = await getNFTData();
      //print(data.keys);
      setState(() {
        value = data;

        int numNfts = value["totalCount"];
        List<dynamic> nftList = value["ownedNfts"];

        print('Total NFTs owned by $address: $numNfts');

        // let i = 1;

        // for (let nft of nftList) {
        for (int i = 0; i < nftList.length; i++) {
          //print('${i}. ${nftList[i]['title']}');
          //  if (value["ownedNfts"][i]['metadata']['image'].toString().startsWith('http')) {
          print('$i. ${nftList[i]['metadata']['image']}');
          //}
        }

        tl = TasksList(getCryptoCard());

        loaded = 'Yes';
      });
    } catch (e) {
      print(e);
    }
  }

  getNFTData() async {
    //Map<String, String> prices = {'Chris':'1775',};
    String requestURL = ccAllAPIURL;
    var decodedData;

    // requestURL = '$requestURL&apikey=$apiKey';
    // print(requestURL);
    http.Response response = await http.get(Uri.parse(requestURL));

    //   print('got to getCoinData after url');

    if (response.statusCode == 200) {
      decodedData = jsonDecode(response.body);
//      print(decodedData);
    } else {
      print(response.statusCode);
      throw 'Problem with the get request';
    }
    return decodedData;
  }

  @override
  void initState() {
    super.initState();
    httpClient = new Client();
    ethClient = new web3.Web3Client(
        "https://eth-goerli.g.alchemy.com/v2/YOUR_API_KEY", httpClient);
    getData();
  }

  List<String> getCryptoCard() {
    //List <CryptoCard> cc = [];
    List<String> cc = [];

    // Map valueTest = {};

    if (value.isNotEmpty) {
      //print('empty');
      //   print(value);
      print('got to getCryptoCard');
      // print(value["ownedNfts"]);//[0]['metadata']['image']);

      for (int i = 0; i < value["ownedNfts"].length; i++) {
        if (value["ownedNfts"][i]['metadata']['image']
            .toString()
            .startsWith('http')) {
          cc.add(
              /* CryptoCard(title: value.isEmpty ? '?' : value['Data'][i]['title'],
              url: value['Data'][i]['url'],
              img: value['Data'][i]['imageurl'])*/
              value["ownedNfts"][i]['metadata']['image']);
        }
        //}
      }
      loadedNFT = 'Yes';
    } else {
      print('value is empty');
      print(value);
    }
    // print(source.toString());
    return cc;
  }

  Future<web3.DeployedContract> loadContract() async {
    String abiCode = await rootBundle.loadString("assets/WatchNFT.json");
    //String contractAddress = "0x746017CBd78689A80a45bC56B2f913A71aC532DD";
    String contractAddress = "0x45812AF52f22e77D1d3Af9FCb4e9c8e8D0354C15";

    print("loadContract");

    String abiStringFile = await rootBundle.loadString("assets/WatchNFT.json");
    var jsonAbi = jsonDecode(abiStringFile);
    String _abiCode = jsonEncode(jsonAbi["abi"]);

    final contract = web3.DeployedContract(
        web3.ContractAbi.fromJson(_abiCode, "WatchNFT"),
        web3.EthereumAddress.fromHex(contractAddress));

    // final contract = DeployedContract(ContractAbi.fromJson(abiCode, "BuyMeACoffee"),
    //   EthereumAddress.fromHex(contractAddress));
    return contract;
  }

  Future<List<dynamic>> query(String functionName, List<dynamic> args) async {
    final contract = await loadContract();

    print("in query");

    final ethFunction = contract.function(functionName);
    print("ethFunction");
    final data = await ethClient.call(
        contract: contract, function: ethFunction, params: args);
    //final data = await ethClient.call(
    //  contract: contract, function: ethFunction, params: ["anon",
    //"Enjoy your coffee!",
    //"value: "(Decimal.parse("0.001") * Decimal.ten.pow(18).toDecimal()).toBigInt().toString());
    print("data");
    print(data);
    //final data = [];
    return data;
  }

  @override
  Widget build(BuildContext context) {
    var size = MediaQuery.of(context).size;

    if (size.width < 300) {
      return MaterialApp(
        home: Scaffold(
          backgroundColor: Colors.black,
          body: Center(
            child: WatchShape(
              builder: (BuildContext context, WearShape shape, Widget? child) {
                return Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: <Widget>[
                    //  Text('Shape: ${shape == WearShape.round ? 'round' : 'square'}', ),
                    child!,
                  ],
                );
              },
              child: AmbientMode(
                builder: (BuildContext context, WearMode mode, Widget? child) {
                  return //Text('Mode: ${mode == WearMode.active ? 'Active' : 'Ambient'}',);
                      Column(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    // mainAxisSize: MainAxisSize.min,
                    children: <Widget>[
                      // Flexible(child:
                      Container(
                        //padding: EdgeInsets.symmetric(horizontal: 20.0),
                        height: 180,
                        decoration: BoxDecoration(
                            color: vmcol,
                            borderRadius: BorderRadius.only(
                              topLeft: Radius.circular(20.0),
                              topRight: Radius.circular(20.0),
                            )),
                        child: loaded != 'Yes'
                            ? SpinKitChasingDots(
                                color: Colors.blueGrey,
                                size: 100.0,
                              )
                            :
                            //TasksList(getCryptoCard()),
                            tl,
                        /*  Text('data',
                                style: TextStyle(color: Colors.amber,
                                    fontWeight: FontWeight.bold,
                                    fontSize: 20.0),),*/
                      ) //),*/
                    ],
                  );
                },
              ),
            ),
          ),
        ),
      );
    }
    // Phone-sized device
    else {
      return Scaffold(
        appBar: AppBar(
          backgroundColor: Colors.blueGrey, //logIn,
          title: Row(
            children: [
              Text(
                '  WatchNFT',
                style: TextStyle(
                    color: Colors.amber,
                    fontWeight: FontWeight.bold,
                    fontSize: 20.0),
              ),
            ],
          ),
          actions: [
            PopupMenuButton(
              itemBuilder: (BuildContext bc) => [
                PopupMenuItem(child: Text("About"), value: "About"),
                PopupMenuItem(child: Text("Hup2"), value: "Hup2"),
                PopupMenuItem(
                    child: Text("Football League Tables"), value: "pl"),
                PopupMenuItem(child: Text("Horse Racing Tables"), value: "hr"),
                PopupMenuItem(
                    child: Text("EBook Price Comparison"), value: "ebpc"),
              ],
              onSelected: (route) {
                if (route != 'About') {
                  //Hup2().launchPage(route.toString());
                  //else
                  Navigator.pushNamed(context, route.toString());
                }
              },
            ), //actions widget in appbar
          ],
        ),
        body: Column(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: <Widget>[
            Expanded(
                child: Container(
              //padding: EdgeInsets.symmetric(horizontal: 20.0),
              decoration: BoxDecoration(
                  color: vmcol,
                  borderRadius: const BorderRadius.only(
                    topLeft: Radius.circular(20.0),
                    topRight: Radius.circular(20.0),
                  )),
              child: loaded != 'Yes'
                  ? const SpinKitChasingDots(
                      color: Colors.blueGrey,
                      size: 100.0,
                    )
                  : TasksList(getCryptoCard()),
            )),
          ],
        ),
      );
    }
  }
}

class TasksList extends StatelessWidget {
  TasksList(this.cc);

  final List<String> cc;

  @override
  Widget build(BuildContext context) {
    return GridView.count(
      // Create a grid with 2 columns. If you change the scrollDirection to
      // horizontal, this produces 2 rows.
      crossAxisCount: 1, //size.width > 1000 ? 3 : 2,
      //   childAspectRatio: (itemWidthHei / itemHeightHei),
      // Generate 100 widgets that display their index in the List.
      children: List.generate(cc.length, (index) {
        //  print(cc[index].img.substring(cc[index].img.lastIndexOf('/')+1));
        print(cc[index]);

        return Container(
          decoration: BoxDecoration(
            color: vmcol, //blue[100],
            // Set a border for each side of the box
            /*border: Border(
                  top: BorderSide(width: 5, color: Colors.blueGrey),
                  right: BorderSide(width: 5, color: Colors.blueGrey),
                ),*/
          ),
          child: SingleChildScrollView(
            physics: BouncingScrollPhysics(),
            scrollDirection: Axis.vertical,
            child: Column(
              children: [
                // UniversalPlatform.isAndroid ?
                //Image.network("https://arweave.net/t6-xgtJOHC21L36vPZRpFm20DYzyLJchM7sCdv17_UM"),
                Image.network(
                  cc[index],
                  loadingBuilder: (context, child, loadingProgress) {
                    if (loadingProgress == null) return child;

                    return //const Center(child: Text('Loading Nft''s...'));
                        const SpinKitChasingDots(
                      color: Colors.deepOrangeAccent,
                      size: 100.0,
                    );
                    // You can use LinearProgressIndicator or CircularProgressIndicator instead
                  },
                ),
              ],
            ),
          ),
        );
        // }
      }),
    );
  }
}
