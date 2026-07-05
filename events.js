const EVENTS = [
  {
    "start": 500,
    "end": 520,
    "title": "Post-Roman successor kingdoms dominate the West",
    "people": [
      "Clovis I",
      "Theoderic the Great",
      "Alaric II"
    ],
    "summary": "Frankish, Visigothic, Ostrogothic and Byzantine powers compete over the former Western Roman world."
  },
  {
    "start": 527,
    "end": 565,
    "title": "Reign of Justinian I",
    "people": [
      "Justinian I",
      "Theodora",
      "Belisarius",
      "Narses"
    ],
    "summary": "The Byzantine Empire attempts to reconquer parts of the western Mediterranean, including North Africa and Italy."
  },
  {
    "start": 568,
    "end": 600,
    "title": "Lombard invasion of Italy",
    "people": [
      "Alboin",
      "Authari",
      "Gregory I the Great"
    ],
    "summary": "The Lombards enter Italy, weakening Byzantine control and reshaping the Italian peninsula."
  },
  {
    "start": 590,
    "end": 604,
    "title": "Papacy of Gregory the Great",
    "people": [
      "Gregory I the Great",
      "Augustine of Canterbury"
    ],
    "summary": "A major turning point for medieval papal authority and missionary activity in England."
  },
  {
    "start": 610,
    "end": 641,
    "title": "Heraclius and the Byzantine-Persian wars",
    "people": [
      "Heraclius",
      "Khosrow II"
    ],
    "summary": "Byzantium survives a major war with Persia just before the rise of Islam transforms the eastern Mediterranean."
  },
  {
    "start": 632,
    "end": 661,
    "title": "Early Islamic expansion",
    "people": [
      "Muhammad",
      "Abu Bakr",
      "Umar ibn al-Khattab",
      "Uthman",
      "Ali"
    ],
    "summary": "Arab-Muslim armies expand rapidly across the Near East and North Africa."
  },
  {
    "start": 661,
    "end": 750,
    "title": "Umayyad Caliphate",
    "people": [
      "Mu'awiya I",
      "Abd al-Malik",
      "Al-Walid I"
    ],
    "summary": "The Umayyads rule a vast Islamic empire and expand into North Africa and Iberia."
  },
  {
    "start": 711,
    "end": 718,
    "title": "Muslim conquest of Iberia",
    "people": [
      "Tariq ibn Ziyad",
      "Musa ibn Nusayr",
      "Roderic"
    ],
    "summary": "Umayyad forces cross into Iberia and defeat the Visigothic kingdom."
  },
  {
    "start": 718,
    "end": 740,
    "title": "Rise of Asturias",
    "people": [
      "Pelagius of Asturias"
    ],
    "summary": "A Christian power base forms in northern Iberia, later central to the Reconquista narrative."
  },
  {
    "start": 732,
    "end": 732,
    "title": "Battle of Tours / Poitiers",
    "people": [
      "Charles Martel",
      "Abd al-Rahman al-Ghafiqi"
    ],
    "summary": "Frankish forces defeat an Umayyad-led army in Gaul."
  },
  {
    "start": 751,
    "end": 768,
    "title": "Rise of the Carolingians",
    "people": [
      "Pepin the Short",
      "Pope Stephen II"
    ],
    "summary": "The Carolingians replace the Merovingians and form a strong Frankish monarchy."
  },
  {
    "start": 768,
    "end": 814,
    "title": "Charlemagne and the Carolingian Empire",
    "people": [
      "Charlemagne",
      "Pope Leo III"
    ],
    "summary": "Charlemagne expands Frankish power and is crowned emperor in 800."
  },
  {
    "start": 800,
    "end": 800,
    "title": "Coronation of Charlemagne",
    "people": [
      "Charlemagne",
      "Pope Leo III"
    ],
    "summary": "Charlemagne is crowned Emperor in Rome, reshaping western imperial politics."
  },
  {
    "start": 843,
    "end": 843,
    "title": "Treaty of Verdun",
    "people": [
      "Lothair I",
      "Louis the German",
      "Charles the Bald"
    ],
    "summary": "The Carolingian Empire is divided into West Francia, East Francia and Middle Francia."
  },
  {
    "start": 850,
    "end": 950,
    "title": "Viking Age pressure across Europe",
    "people": [
      "Ragnar Lodbrok",
      "Alfred the Great",
      "Rollo"
    ],
    "summary": "Norse raids, settlement and trade reshape Britain, Ireland, Francia and eastern routes."
  },
  {
    "start": 862,
    "end": 980,
    "title": "Rise of Kievan Rus'",
    "people": [
      "Rurik",
      "Oleg of Novgorod",
      "Sviatoslav I"
    ],
    "summary": "Eastern Slavic and Norse elites build the Rus' political world."
  },
  {
    "start": 910,
    "end": 930,
    "title": "Christian kingdoms in northern Iberia expand",
    "people": [
      "Ordoño II",
      "Sancho I of Pamplona"
    ],
    "summary": "León, Pamplona/Navarre and other Christian powers push south and consolidate."
  },
  {
    "start": 955,
    "end": 955,
    "title": "Battle of Lechfeld",
    "people": [
      "Otto I",
      "Hungarian raiders"
    ],
    "summary": "Otto I defeats the Magyars and strengthens East Frankish/German power."
  },
  {
    "start": 962,
    "end": 962,
    "title": "Otto I crowned emperor",
    "people": [
      "Otto I",
      "Pope John XII"
    ],
    "summary": "The imperial title in the West is revived in what later becomes the Holy Roman Empire."
  },
  {
    "start": 987,
    "end": 987,
    "title": "Capetian dynasty begins in France",
    "people": [
      "Hugh Capet"
    ],
    "summary": "Hugh Capet becomes king, beginning the Capetian line in France."
  },
  {
    "start": 1000,
    "end": 1030,
    "title": "Christianization of northern and eastern Europe",
    "people": [
      "Vladimir the Great",
      "Stephen I of Hungary",
      "Olaf Tryggvason"
    ],
    "summary": "Christian monarchy expands in Hungary, Rus', Scandinavia and surrounding regions."
  },
  {
    "start": 1031,
    "end": 1031,
    "title": "Collapse of the Caliphate of Córdoba",
    "people": [
      "Hisham III"
    ],
    "summary": "al-Andalus fragments into taifa kingdoms."
  },
  {
    "start": 1054,
    "end": 1054,
    "title": "East-West Schism",
    "people": [
      "Pope Leo IX",
      "Michael I Cerularius"
    ],
    "summary": "A major split between Latin Western Christianity and Greek Eastern Christianity."
  },
  {
    "start": 1066,
    "end": 1066,
    "title": "Norman Conquest of England",
    "people": [
      "William the Conqueror",
      "Harold Godwinson"
    ],
    "summary": "William of Normandy conquers England after the Battle of Hastings."
  },
  {
    "start": 1073,
    "end": 1085,
    "title": "Gregorian Reform and Investiture Conflict",
    "people": [
      "Pope Gregory VII",
      "Henry IV"
    ],
    "summary": "A major struggle over church reform and the right to appoint bishops."
  },
  {
    "start": 1085,
    "end": 1085,
    "title": "Capture of Toledo",
    "people": [
      "Alfonso VI of León-Castile"
    ],
    "summary": "A major Christian victory in Iberia."
  },
  {
    "start": 1095,
    "end": 1099,
    "title": "First Crusade",
    "people": [
      "Pope Urban II",
      "Godfrey of Bouillon",
      "Bohemond of Taranto",
      "Raymond IV of Toulouse"
    ],
    "summary": "Western crusaders march to the eastern Mediterranean and capture Jerusalem in 1099."
  },
  {
    "start": 1147,
    "end": 1149,
    "title": "Second Crusade",
    "people": [
      "Louis VII of France",
      "Conrad III",
      "Bernard of Clairvaux"
    ],
    "summary": "A major crusading campaign after the fall of Edessa."
  },
  {
    "start": 1187,
    "end": 1187,
    "title": "Battle of Hattin and fall of Jerusalem",
    "people": [
      "Saladin",
      "Guy of Lusignan",
      "Raynald of Châtillon"
    ],
    "summary": "Saladin defeats the crusader army and retakes Jerusalem."
  },
  {
    "start": 1189,
    "end": 1192,
    "title": "Third Crusade",
    "people": [
      "Richard the Lionheart",
      "Saladin",
      "Philip II Augustus",
      "Frederick Barbarossa"
    ],
    "summary": "European monarchs campaign in the Levant after the fall of Jerusalem."
  },
  {
    "start": 1204,
    "end": 1204,
    "title": "Fourth Crusade captures Constantinople",
    "people": [
      "Enrico Dandolo",
      "Alexios IV Angelos",
      "Boniface of Montferrat"
    ],
    "summary": "Crusaders sack Constantinople, severely weakening Byzantium."
  },
  {
    "start": 1212,
    "end": 1212,
    "title": "Battle of Las Navas de Tolosa",
    "people": [
      "Alfonso VIII of Castile",
      "Muhammad al-Nasir",
      "Peter II of Aragon",
      "Sancho VII of Navarre"
    ],
    "summary": "A decisive Christian victory against the Almohads in Iberia."
  },
  {
    "start": 1215,
    "end": 1215,
    "title": "Magna Carta and Fourth Lateran Council",
    "people": [
      "King John of England",
      "Pope Innocent III"
    ],
    "summary": "Two landmark events in English political history and medieval church reform."
  },
  {
    "start": 1220,
    "end": 1250,
    "title": "Frederick II and imperial conflict",
    "people": [
      "Frederick II",
      "Pope Gregory IX",
      "Pope Innocent IV"
    ],
    "summary": "The Hohenstaufen emperor clashes with the papacy while ruling a Mediterranean empire."
  },
  {
    "start": 1236,
    "end": 1248,
    "title": "Major Christian conquests in Iberia",
    "people": [
      "Ferdinand III of Castile",
      "James I of Aragon"
    ],
    "summary": "Córdoba, Valencia and Seville fall to Christian rulers."
  },
  {
    "start": 1241,
    "end": 1242,
    "title": "Mongol invasion of Europe",
    "people": [
      "Batu Khan",
      "Subutai",
      "Béla IV of Hungary"
    ],
    "summary": "Mongol armies devastate parts of eastern and central Europe."
  },
  {
    "start": 1261,
    "end": 1261,
    "title": "Byzantine recovery of Constantinople",
    "people": [
      "Michael VIII Palaiologos"
    ],
    "summary": "The Byzantine Empire retakes Constantinople from the Latin Empire."
  },
  {
    "start": 1291,
    "end": 1291,
    "title": "Fall of Acre",
    "people": [
      "Al-Ashraf Khalil",
      "Knights Templar",
      "Hospitallers"
    ],
    "summary": "The last major crusader stronghold in the Holy Land falls."
  },
  {
    "start": 1309,
    "end": 1377,
    "title": "Avignon Papacy",
    "people": [
      "Clement V",
      "John XXII",
      "Benedict XII",
      "Clement VI",
      "Gregory XI"
    ],
    "summary": "The papacy resides in Avignon rather than Rome."
  },
  {
    "start": 1337,
    "end": 1453,
    "title": "Hundred Years' War",
    "people": [
      "Edward III",
      "Philip VI",
      "Henry V",
      "Joan of Arc",
      "Charles VII"
    ],
    "summary": "Long conflict between England and France over dynastic claims and territory."
  },
  {
    "start": 1347,
    "end": 1353,
    "title": "Black Death in Europe",
    "people": [
      "Giovanni Boccaccio",
      "Clement VI"
    ],
    "summary": "The plague kills a huge share of Europe's population and transforms society."
  },
  {
    "start": 1378,
    "end": 1417,
    "title": "Western Schism",
    "people": [
      "Urban VI",
      "Clement VII",
      "Gregory XII",
      "Martin V"
    ],
    "summary": "Rival papal claimants divide Latin Christendom."
  },
  {
    "start": 1389,
    "end": 1389,
    "title": "Battle of Kosovo",
    "people": [
      "Murad I",
      "Lazar of Serbia"
    ],
    "summary": "A key battle in Ottoman expansion into the Balkans."
  },
  {
    "start": 1415,
    "end": 1415,
    "title": "Agincourt and Council of Constance",
    "people": [
      "Henry V",
      "Charles VI",
      "Jan Hus",
      "Sigismund"
    ],
    "summary": "A major English victory in France and a major church council during the Western Schism."
  },
  {
    "start": 1431,
    "end": 1431,
    "title": "Trial and execution of Joan of Arc",
    "people": [
      "Joan of Arc",
      "Charles VII"
    ],
    "summary": "Joan is executed after helping revive French fortunes in the Hundred Years' War."
  },
  {
    "start": 1453,
    "end": 1453,
    "title": "Fall of Constantinople and end of Hundred Years' War",
    "people": [
      "Mehmed II",
      "Constantine XI",
      "Charles VII"
    ],
    "summary": "The Ottomans capture Constantinople; France defeats England in the final phase of the Hundred Years' War."
  },
  {
    "start": 1469,
    "end": 1479,
    "title": "Union of Castile and Aragon",
    "people": [
      "Isabella I of Castile",
      "Ferdinand II of Aragon"
    ],
    "summary": "The dynastic union lays foundations for early modern Spain."
  },
  {
    "start": 1492,
    "end": 1492,
    "title": "Granada falls and Atlantic expansion begins",
    "people": [
      "Ferdinand II",
      "Isabella I",
      "Boabdil",
      "Christopher Columbus"
    ],
    "summary": "The Nasrid kingdom of Granada falls, ending Muslim rule in Iberia; Columbus reaches the Americas."
  },
  {
    "start": 1494,
    "end": 1500,
    "title": "Italian Wars begin",
    "people": [
      "Charles VIII of France",
      "Ludovico Sforza",
      "Alexander VI"
    ],
    "summary": "French intervention in Italy begins a long era of European conflict over the peninsula."
  }
];
