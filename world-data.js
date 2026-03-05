// Dünya Veritabanı - Tüm Ülkeler, Şehirler ve İlçeler
const worldData = {
    // Avrupa Ülkeleri
    europe: {
        türkiye: {
            name: "Türkiye",
            flag: "🇹🇷",
            currency: "TRY",
            population: 85000000,
            cities: {
                istanbul: {
                    name: "İstanbul",
                    lat: 41.015137,
                    lng: 28.979530,
                    population: 15500000,
                    districts: {
                        beyoglu: "Beyoğlu",
                        kadikoy: "Kadıköy",
                        sisli: "Şişli",
                        besiktas: "Beşiktaş",
                        fatih: "Fatih",
                        eminonu: "Eminönü",
                        uskudar: "Üsküdar",
                        maltepe: "Maltepe",
                        atasehir: "Ataşehir",
                        pendik: "Pendik",
                        umraniye: "Ümraniye",
                        kartal: "Kartal",
                        maltepe: "Maltepe",
                        sariyer: "Sarıyer",
                        beykoz: "Beykoz",
                        cevizli: "Çevizli",
                        silivri: "Silivri",
                        tuzla: "Tuzla",
                        adalar: "Adalar",
                        buyukcekmece: "Büyükçekmece",
                        kucukcekmece: "Küçükçekmece",
                        sancaktepe: "Sancaktepe",
                        gaziosmanpasa: "Gaziosmanpaşa",
                        eyup: "Eyüp",
                        bayrampasa: "Bayrampaşa",
                        arnavutkoy: "Arnavutköy",
                        bakirkoy: "Bakırköy",
                        bahcelievler: "Bahçelievler",
                        bagcilar: "Bağcılar",
                        bahcelievler: "Bahçelievler",
                        esenler: "Esenler",
                        esenyurt: "Esenyurt",
                        gaziosmanpasa: "Gaziosmanpaşa",
                        gungoren: "Güngören",
                        kagithane: "Kağıthane",
                        sultangazi: "Sultangazi"
                    }
                },
                ankara: {
                    name: "Ankara",
                    lat: 39.925533,
                    lng: 32.866287,
                    population: 5500000,
                    districts: {
                        cankaya: "Çankaya",
                        yenimahalle: "Yenimahalle",
                        mamak: "Mamak",
                        sincan: "Sincan",
                        kecioren: "Keçiören",
                        etimesgut: "Etimesgut",
                        altindag: "Altındağ",
                        ulus: "Ulus",
                        kizilay: "Kızılay",
                        cebeci: "Çebeci",
                        dikmen: "Dikmen",
                        balgat: "Balgat",
                        emek: "Emek",
                        demetevler: "Demetevler",
                        yuzuncuyil: "Yüzüncüyıl",
                        sincan: "Sincan",
                        pursaklar: "Pursaklar",
                        mamak: "Mamak",
                        golbasi: "Gölbaşı",
                        akyurt: "Akyurt",
                        cubuk: "Çubuk",
                        kazan: "Kazan",
                        nallihan: "Nallıhan",
                        polatli: "Polatlı",
                        sereflikochisar: "Şereflikoçhisar"
                    }
                },
                izmir: {
                    name: "İzmir",
                    lat: 38.423733,
                    lng: 27.142826,
                    population: 4400000,
                    districts: {
                        konak: "Konak",
                        alsancak: "Alsancak",
                        bornova: "Bornova",
                        buca: "Buca",
                        karsiyaka: "Karşıyaka",
                        narlidere: "Narlıdere",
                        balcova: "Balçova",
                        urla: "Urla",
                        kemalpasa: "Kemalpaşa",
                        bayrakli: "Bayraklı",
                        cigli: "Çiğli",
                        gaziemir: "Gaziemir",
                        guzelbahce: "Güzelbahçe",
                        karsiyaka: "Karşıyaka",
                        menemen: "Menemen",
                        seferihisar: "Seferihisar",
                        tire: "Tire",
                        torbali: "Torbalı",
                        kemalpasa: "Kemalpaşa",
                        konak: "Konak",
                        bornova: "Bornova"
                    }
                },
                bursa: {
                    name: "Bursa",
                    lat: 40.188531,
                    lng: 29.061057,
                    population: 3100000,
                    districts: {
                        osmangazi: "Osmangazi",
                        nilufer: "Nilüfer",
                        mudanya: "Mudanya",
                        gemlik: "Gemlik",
                        inegol: "İnegöl",
                        yildirim: "Yıldırım",
                        kestel: "Kestel",
                        orhangazi: "Orhangazi"
                    }
                },
                antalya: {
                    name: "Antalya",
                    lat: 36.884804,
                    lng: 30.695663,
                    population: 2600000,
                    districts: {
                        muratpasa: "Muratpaşa",
                        konyaalti: "Konyaaltı",
                        kepez: "Kepez",
                        aksu: "Aksu",
                        kumluca: "Kumluca",
                        manavgat: "Manavgat",
                        side: "Side",
                        alanya: "Alanya",
                        kemer: "Kemer",
                        serik: "Serik"
                    }
                }
            }
        },
        almanya: {
            name: "Almanya",
            flag: "🇩🇪",
            currency: "EUR",
            population: 83000000,
            cities: {
                berlin: {
                    name: "Berlin",
                    lat: 52.520008,
                    lng: 13.404954,
                    population: 3700000,
                    districts: {
                        mitte: "Mitte",
                        friedrichshain: "Friedrichshain",
                        kreuzberg: "Kreuzberg",
                        neukolln: "Neukölln",
                        charlottenburg: "Charlottenburg",
                        wedding: "Wedding",
                        prenzlauerberg: "Prenzlauer Berg",
                        tempelhof: "Tempelhof",
                        schoneberg: "Schöneberg",
                        steglitz: "Steglitz",
                        zehlendorf: "Zehlendorf"
                    }
                },
                munih: {
                    name: "Münih",
                    lat: 48.135125,
                    lng: 11.581981,
                    population: 1500000,
                    districts: {
                        altstadt: "Altstadt",
                        neuhausen: "Neuhausen",
                        moosach: "Moosach",
                        milbertshofen: "Milbertshofen",
                        schwabing: "Schwabing",
                        sendling: "Sendling",
                        hadern: "Hadern",
                        pasing: "Pasing",
                        laim: "Laim"
                    }
                },
                hamburg: {
                    name: "Hamburg",
                    lat: 53.551085,
                    lng: 9.993682,
                    population: 1900000,
                    districts: {
                        altona: "Altona",
                        eppendorf: "Eppendorf",
                        winterhude: "Winterhude",
                        hafen: "Hafen",
                        sternschanze: "Sternschanze",
                        uhlenhorst: "Uhlenhorst",
                        blankenese: "Blankenese",
                        harburg: "Harburg",
                        wilhelmsburg: "Wilhelmsburg"
                    }
                }
            }
        },
        ingiltere: {
            name: "İngiltere",
            flag: "🇬🇧",
            currency: "GBP",
            population: 67000000,
            cities: {
                london: {
                    name: "Londra",
                    lat: 51.507351,
                    lng: -0.127758,
                    population: 9000000,
                    districts: {
                        westminster: "Westminster",
                        camden: "Camden",
                        kensington: "Kensington",
                        chelsea: "Chelsea",
                        nottinghill: "Notting Hill",
                        soho: "Soho",
                        coventgarden: "Covent Garden",
                        southwark: "Southwark",
                        canarywharf: "Canary Wharf",
                        shoreditch: "Shoreditch"
                    }
                },
                manchester: {
                    name: "Manchester",
                    lat: 53.480759,
                    lng: -2.242631,
                    population: 550000,
                    districts: {
                        citycenter: "City Center",
                        northernquarter: "Northern Quarter",
                        ancoats: "Ancoats",
                        salford: "Salford",
                        didsbury: "Didsbury",
                        chorlton: "Chorlton",
                        rusholme: "Rusholme",
                        oldtrafford: "Old Trafford"
                    }
                }
            }
        },
        fransa: {
            name: "Fransa",
            flag: "🇫🇷",
            currency: "EUR",
            population: 65000000,
            cities: {
                paris: {
                    name: "Paris",
                    lat: 48.8566613,
                    lng: 2.352222,
                    population: 2200000,
                    districts: {
                        louvre: "Louvre",
                        montmartre: "Montmartre",
                        champselysees: "Champs-Élysées",
                        latinquarter: "Latin Quarter",
                        marais: "Marais",
                        saintgermain: "Saint-Germain",
                        montparnasse: "Montparnasse",
                        bastille: "Bastille",
                        invalides: "Invalides",
                        trocadero: "Trocadero"
                    }
                },
                lyon: {
                    name: "Lyon",
                    lat: 45.764043,
                    lng: 4.835659,
                    population: 520000,
                    districts: {
                        vieuxlyon: "Vieux Lyon",
                        croixrousse: "Croix-Rousse",
                        presquile: "Presqu'île",
                        partdieu: "Part-Dieu",
                        confluence: "Confluence",
                        guillotiere: "Guillotière"
                    }
                }
            }
        },
        italya: {
            name: "İtalya",
            flag: "🇮🇹",
            currency: "EUR",
            population: 60000000,
            cities: {
                roma: {
                    name: "Roma",
                    lat: 41.902783,
                    lng: 12.496366,
                    population: 2900000,
                    districts: {
                        colosseo: "Colosseo",
                        trastevere: "Trastevere",
                        trevi: "Trevi",
                        navona: "Navona",
                        vatican: "Vatican",
                        spagna: "Spagna",
                        campo: "Campo de' Fiori",
                        pantheon: "Pantheon",
                        testaccio: "Testaccio"
                    }
                },
                milano: {
                    name: "Milano",
                    lat: 45.464204,
                    lng: 9.189982,
                    population: 1400000,
                    districts: {
                        duomo: "Duomo",
                        brera: "Brera",
                        navigli: "Navigli",
                        porta: "Porta Romana",
                        corso: "Corso Buenos Aires",
                        parco: "Parco Sempione",
                        centrale: "Centrale"
                    }
                }
            }
        },
        ispanya: {
            name: "İspanya",
            flag: "🇪🇸",
            currency: "EUR",
            population: 47000000,
            cities: {
                madrid: {
                    name: "Madrid",
                    lat: 40.416775,
                    lng: -3.703790,
                    population: 6600000,
                    districts: {
                        centro: "Centro",
                        salamanca: "Salamanca",
                        chamartin: "Chamartín",
                        retiro: "Retiro",
                        moncloa: "Moncloa",
                        latina: "Latina",
                        carabanchel: "Carabanchel",
                        usera: "Usera",
                        puente: "Puente de Vallecas",
                        moratalaz: "Moratalaz"
                    }
                },
                barcelona: {
                    name: "Barselona",
                    lat: 41.385064,
                    lng: 2.173403,
                    population: 5600000,
                    districts: {
                        gothic: "Gothic Quarter",
                        raval: "Raval",
                        born: "Born",
                        eixample: "Eixample",
                        gracia: "Gràcia",
                        barceloneta: "Barceloneta",
                        pedralbes: "Pedralbes",
                        sants: "Sants",
                        poblesec: "Poble Sec"
                    }
                }
            }
        }
    },
    
    // Asya Ülkeleri
    asia: {
        cin: {
            name: "Çin",
            flag: "🇨🇳",
            currency: "CNY",
            population: 1400000000,
            cities: {
                pekin: {
                    name: "Pekin",
                    lat: 39.904200,
                    lng: 116.407396,
                    population: 22000000,
                    districts: {
                        dongcheng: "Dongcheng",
                        xicheng: "Xicheng",
                        chaoyang: "Chaoyang",
                        fengtai: "Fengtai",
                        shijingshan: "Shijingshan",
                        haidian: "Haidian",
                        mentougou: "Mentougou",
                        fangshan: "Fangshan",
                        daxing: "Daxing"
                    }
                },
        shanghai: {
                    name: "Şanghay",
                    lat: 31.230416,
                    lng: 121.473701,
                    population: 26000000,
                    districts: {
                        huangpu: "Huangpu",
                        xuhui: "Xuhui",
                        changning: "Changning",
                        jingan: "Jingan",
                        putuo: "Putuo",
                        zhabei: "Zhabei",
                        hongkou: "Hongkou",
                        yangpu: "Yangpu",
                        baoshan: "Baoshan"
                    }
                }
            }
        },
        japonya: {
            name: "Japonya",
            flag: "🇯🇵",
            currency: "JPY",
            population: 125000000,
            cities: {
                tokyo: {
                    name: "Tokyo",
                    lat: 35.676232,
                    lng: 139.650311,
                    population: 14000000,
                    districts: {
                        shibuya: "Shibuya",
                        shinjuku: "Shinjuku",
                        harajuku: "Harajuku",
                        ginza: "Ginza",
                        akihabara: "Akihabara",
                        roppongi: "Roppongi",
                        marunouchi: "Marunouchi",
                        odaiba: "Odaiba",
                        asakusa: "Asakusa",
                        ueno: "Ueno"
                    }
                },
                osaka: {
                    name: "Osaka",
                    lat: 34.693738,
                    lng: 135.502251,
                    population: 2700000,
                    districts: {
                        chuo: "Chuo",
                        kita: "Kita",
                        minato: "Minato",
                        tennoji: "Tennoji",
                        abeno: "Abeno",
                        nishi: "Nishi",
                        yodogawa: "Yodogawa",
                        suminoe: "Suminoe",
                        taisho: "Taisho"
                    }
                }
            }
        },
        hindistan: {
            name: "Hindistan",
            flag: "🇮🇳",
            currency: "INR",
            population: 1400000000,
            cities: {
                mumbai: {
                    name: "Mumbai",
                    lat: 19.076090,
                    lng: 72.877426,
                    population: 20000000,
                    districts: {
                        southmumbai: "South Mumbai",
                        andheri: "Andheri",
                        bandra: "Bandra",
                        colaba: "Colaba",
                        worli: "Worli",
                        juhu: "Juhu",
                        goregaon: "Goregaon",
                        powai: "Powai",
                        dadar: "Dadar",
                        parel: "Parel"
                    }
                },
                delhi: {
                    name: "Delhi",
                    lat: 28.613939,
                    lng: 77.209021,
                    population: 32000000,
                    districts: {
                        chandnichowk: "Chandni Chowk",
                        connaughtplace: "Connaught Place",
                        hauzkhas: "Hauz Khas",
                        janpath: "Janpath",
                        karolbagh: "Karol Bagh",
                        daryaganj: "Daryaganj",
                        lajpatnagar: "Lajpat Nagar",
                        sarojininagar: "Sarojini Nagar",
                        defenscolony: "Defence Colony"
                    }
                }
            }
        }
    },
    
    // Amerika Ülkeleri
    americas: {
        abd: {
            name: "Amerika Birleşik Devletleri",
            flag: "🇺🇸",
            currency: "USD",
            population: 330000000,
            cities: {
                "new-york": {
                    name: "New York",
                    lat: 40.712776,
                    lng: -74.005974,
                    population: 8400000,
                    districts: {
                        manhattan: "Manhattan",
                        brooklyn: "Brooklyn",
                        queens: "Queens",
                        bronx: "Bronx",
                        statenisland: "Staten Island",
                        harlem: "Harlem",
                        soho: "SoHo",
                        tribeca: "Tribeca",
                        uppereast: "Upper East Side",
                        upperwest: "Upper West Side"
                    }
                },
                losangeles: {
                    name: "Los Angeles",
                    lat: 34.052235,
                    lng: -118.243683,
                    population: 4000000,
                    districts: {
                        hollywood: "Hollywood",
                        beverlyhills: "Beverly Hills",
                        santamonica: "Santa Monica",
                        venice: "Venice",
                        downtown: "Downtown",
                        koreatown: "Koreatown",
                        littleethiopia: "Little Ethiopia",
                        chinatown: "Chinatown",
                        sawtelle: "Sawtelle",
                        westwood: "Westwood"
                    }
                },
                chicago: {
                    name: "Chicago",
                    lat: 41.878113,
                    lng: -87.629799,
                    population: 2700000,
                    districts: {
                        loop: "The Loop",
                        lincolnpark: "Lincoln Park",
                        lakeview: "Lakeview",
                        wickerpark: "Wicker Park",
                        bucktown: "Bucktown",
                        rivernorth: "River North",
                        goldcoast: "Gold Coast",
                        streeterville: "Streeterville",
                        southloop: "South Loop",
                        westloop: "West Loop"
                    }
                }
            }
        },
        brezilya: {
            name: "Brezilya",
            flag: "🇧🇷",
            currency: "BRL",
            population: 210000000,
            cities: {
                "sao-paulo": {
                    name: "São Paulo",
                    lat: -23.550520,
                    lng: -46.633308,
                    population: 12000000,
                    districts: {
                        centro: "Centro",
                        vila: "Vila Madalena",
                        pinheiros: "Pinheiros",
                        moema: "Moema",
                        itaim: "Itaim Bibi",
                        brooklin: "Brooklin",
                        morumbi: "Morumbi",
                        santo: "Santo Amaro",
                        ibirapuera: "Ibirapuera",
                        vila: "Vila Mariana"
                    }
                },
                riodejaneiro: {
                    name: "Rio de Janeiro",
                    lat: -22.906847,
                    lng: -43.172896,
                    population: 6700000,
                    districts: {
                        copacabana: "Copacabana",
                        ipanema: "Ipanema",
                        leblon: "Leblon",
                        botafogo: "Botafogo",
                        flamengo: "Flamengo",
                        lapa: "Lapa",
                        santateresa: "Santa Teresa",
                        centrom: "Centro",
                        tijuca: "Tijuca",
                        barra: "Barra da Tijuca"
                    }
                }
            }
        },
        kanada: {
            name: "Kanada",
            flag: "🇨🇦",
            currency: "CAD",
            population: 38000000,
            cities: {
                toronto: {
                    name: "Toronto",
                    lat: 43.653225,
                    lng: -79.383186,
                    population: 6200000,
                    districts: {
                        downtown: "Downtown",
                        yorkville: "Yorkville",
                        queenwest: "Queen West",
                        kensington: "Kensington",
                        chinatown: "Chinatown",
                        littleitaly: "Little Italy",
                        greektown: "Greektown",
                        entertainment: "Entertainment District",
                        harbourfront: "Harbourfront",
                        distillery: "Distillery District"
                    }
                },
                vancouver: {
                    name: "Vancouver",
                    lat: 49.282729,
                    lng: -123.120738,
                    population: 2600000,
                    districts: {
                        downtown: "Downtown",
                        gastown: "Gastown",
                        yaletown: "Yaletown",
                        coalharbour: "Coal Harbour",
                        kitsilano: "Kitsilano",
                        granville: "Granville Island",
                        westend: "West End",
                        shaughnessy: "Shaughnessy",
                        mountpleasant: "Mount Pleasant",
                        mainstreet: "Main Street"
                    }
                }
            }
        }
    },
    
    // Afrika Ülkeleri
    africa: {
        misir: {
            name: "Mısır",
            flag: "🇪🇬",
            currency: "EGP",
            population: 100000000,
            cities: {
                kahire: {
                    name: "Kahire",
                    lat: 30.044420,
                    lng: 31.235712,
                    population: 20000000,
                    districts: {
                        zamalek: "Zamalek",
                        heliopolis: "Heliopolis",
                        nasr: "Nasr City",
                        maadi: "Maadi",
                        dokki: "Dokki",
                        mohandessin: "Mohandessin",
                        haram: "Haram",
                        giza: "Giza",
                        shubra: "Shubra",
                        roxy: "Roxy"
                    }
                }
            }
        },
        nijerya: {
            name: "Nijerya",
            flag: "🇳🇬",
            currency: "NGN",
            population: 200000000,
            cities: {
                lagos: {
                    name: "Lagos",
                    lat: 6.524379,
                    lng: 3.379206,
                    population: 14000000,
                    districts: {
                        victoria: "Victoria Island",
                        ikoyi: "Ikoyi",
                        lekki: "Lekki",
                        ikeja: "Ikeja",
                        surulere: "Surulere",
                        apapa: "Apapa",
                        mushin: "Mushin",
                        yaba: "Yaba",
                        oshodi: "Oshodi",
                        festac: "Festac"
                    }
                }
            }
        },
        guneyafrika: {
            name: "Güney Afrika",
            flag: "🇿🇦",
            currency: "ZAR",
            population: 59000000,
            cities: {
                johannesburg: {
                    name: "Johannesburg",
                    lat: -26.204103,
                    lng: 28.047305,
                    population: 5600000,
                    districts: {
                        sandton: "Sandton",
                        rosebank: "Rosebank",
                        melville: "Melville",
                        greenside: "Greenside",
                        soweto: "Soweto",
                        midrand: "Midrand",
                        randburg: "Randburg",
                        fourways: "Fourways",
                        houghton: "Houghton",
                        parktown: "Parktown"
                    }
                }
            }
        }
    },
    
    // Okyanusya Ülkeleri
    oceania: {
        avustralya: {
            name: "Avustralya",
            flag: "🇦🇺",
            currency: "AUD",
            population: 25000000,
            cities: {
                sydney: {
                    name: "Sidney",
                    lat: -33.868820,
                    lng: 151.209290,
                    population: 5300000,
                    districts: {
                        cbd: "CBD",
                        circularquay: "Circular Quay",
                        darling: "Darling Harbour",
                        bondi: "Bondi",
                        manly: "Manly",
                        parramatta: "Parramatta",
                        chatswood: "Chatswood",
                        northsydney: "North Sydney",
                        rock: "The Rocks",
                        surryhills: "Surry Hills"
                    }
                },
                melbourne: {
                    name: "Melbourne",
                    lat: -37.813628,
                    lng: 144.963058,
                    population: 5000000,
                    districts: {
                        cbd: "CBD",
                        southbank: "Southbank",
                        st: "St Kilda",
                        fitzroy: "Fitzroy",
                        carlton: "Carlton",
                        richmond: "Richmond",
                        brunswick: "Brunswick",
                        footscray: "Footscray",
                        docklands: "Docklands",
                        port: "Port Melbourne"
                    }
                }
            }
        },
        yuzelanda: {
            name: "Yeni Zelanda",
            flag: "🇳🇿",
            currency: "NZD",
            population: 5000000,
            cities: {
                auckland: {
                    name: "Auckland",
                    lat: -36.848461,
                    lng: 174.763332,
                    population: 1700000,
                    districts: {
                        cbd: "CBD",
                        ponsonby: "Ponsonby",
                        newmarket: "Newmarket",
                        parnell: "Parnell",
                        hernebay: "Herne Bay",
                        mission: "Mission Bay",
                        mount: "Mount Eden",
                        kroad: "K Road",
                        viaduct: "Viaduct Harbour",
                        northshore: "North Shore"
                    }
                }
            }
        }
    }
};

// Bölge bazlı fiyatlandırma
const regionPrices = {
    // Avrupa
    europe: {
        buyMultiplier: 1.0,
        sellMultiplier: 1.2,
        specialGoods: ["Teknoloji", "Otomobil", "Moda", "Şarap", "Peynir"]
    },
    // Asya
    asia: {
        buyMultiplier: 0.8,
        sellMultiplier: 1.5,
        specialGoods: ["İpek", "Çay", "Pirinç", "Baharat", "Elektronik"]
    },
    // Amerika
    americas: {
        buyMultiplier: 0.9,
        sellMultiplier: 1.3,
        specialGoods: ["Petrol", "Kahve", "Mısır", "Soya", "Et"]
    },
    // Afrika
    africa: {
        buyMultiplier: 0.7,
        sellMultiplier: 1.8,
        specialGoods: ["Elmas", "Altın", "Kakao", "Petrol", "Odun"]
    },
    // Okyanusya
    oceania: {
        buyMultiplier: 1.1,
        sellMultiplier: 1.1,
        specialGoods: ["Yün", "Süt", "Et", "Tahıl", "Mineral"]
    }
};

// Ticaret ürünleri
const tradeGoods = [
    // Gıda ürünleri
    { name: "Buğday", category: "food", basePrice: 250, icon: "🌾" },
    { name: "Pirinç", category: "food", basePrice: 300, icon: "🍚" },
    { name: "Mısır", category: "food", basePrice: 200, icon: "🌽" },
    { name: "Şeker", category: "food", basePrice: 400, icon: "🍬" },
    { name: "Tuz", category: "food", basePrice: 150, icon: "🧂" },
    { name: "Balık", category: "food", basePrice: 500, icon: "🐟" },
    { name: "Et", category: "food", basePrice: 800, icon: "🥩" },
    { name: "Süt", category: "food", basePrice: 180, icon: "🥛" },
    { name: "Peynir", category: "food", basePrice: 600, icon: "🧀" },
    { name: "Yumurta", category: "food", basePrice: 120, icon: "🥚" },
    
    // Tarım ürünleri
    { name: "Pamuk", category: "agriculture", basePrice: 350, icon: "🌱" },
    { name: "İpek", category: "agriculture", basePrice: 1200, icon: "🦋" },
    { name: "Çay", category: "agriculture", basePrice: 450, icon: "🍵" },
    { name: "Kahve", category: "agriculture", basePrice: 550, icon: "☕" },
    { name: "Kakao", category: "agriculture", basePrice: 650, icon: "🍫" },
    { name: "Tütün", category: "agriculture", basePrice: 750, icon: "🚬" },
    { name: "Zeytin", category: "agriculture", basePrice: 400, icon: "🫒" },
    { name: "İncir", category: "agriculture", basePrice: 380, icon: "🍈" },
    { name: "Üzüm", category: "agriculture", basePrice: 320, icon: "🍇" },
    { name: "Nar", category: "agriculture", basePrice: 420, icon: "🍎" },
    { name: "Fındık", category: "agriculture", basePrice: 550, icon: "🌰" },
    { name: "Badem", category: "agriculture", basePrice: 480, icon: "🌰" },
    
    // Madenler
    { name: "Altın", category: "mining", basePrice: 50000, icon: "🏆" },
    { name: "Gümüş", category: "mining", basePrice: 8000, icon: "🥈" },
    { name: "Bakır", category: "mining", basePrice: 1200, icon: "🔧" },
    { name: "Demir", category: "mining", basePrice: 800, icon: "⚙️" },
    { name: "Elmas", category: "mining", basePrice: 100000, icon: "💎" },
    { name: "Kömür", category: "mining", basePrice: 400, icon: "⚫" },
    { name: "Petrol", category: "mining", basePrice: 2500, icon: "🛢️" },
    { name: "Doğalgaz", category: "mining", basePrice: 1800, icon: "🔥" },
    
    // Teknoloji
    { name: "Telefon", category: "technology", basePrice: 5000, icon: "📱" },
    { name: "Bilgisayar", category: "technology", basePrice: 8000, icon: "💻" },
    { name: "Araba", category: "technology", basePrice: 25000, icon: "🚗" },
    { name: "Uçak", category: "technology", basePrice: 150000, icon: "✈️" },
    { name: "Gemi", category: "technology", basePrice: 80000, icon: "🚢" },
    { name: "Tren", category: "technology", basePrice: 30000, icon: "🚂" },
    
    // Lüks ürünler
    { name: "İpek Halı", category: "luxury", basePrice: 15000, icon: "🏺" },
    { name: "Mücevher", category: "luxury", basePrice: 25000, icon: "💍" },
    { name: "Resim", category: "luxury", basePrice: 50000, icon: "🖼️" },
    { name: "Heykel", category: "luxury", basePrice: 35000, icon: "🗿" },
    { name: "Parfüm", category: "luxury", basePrice: 2000, icon: "🧴" },
    { name: "Saat", category: "luxury", basePrice: 8000, icon: "⌚" },
    
    // Giyim
    { name: "Kot Pantolon", category: "clothing", basePrice: 800, icon: "👖" },
    { name: "Tişört", category: "clothing", basePrice: 300, icon: "👕" },
    { name: "Ayakkabı", category: "clothing", basePrice: 600, icon: "👟" },
    { name: "Ceket", category: "clothing", basePrice: 1200, icon: "🧥" },
    { name: "Şapka", category: "clothing", basePrice: 400, icon: "🧢" },
    { name: "Çanta", category: "clothing", basePrice: 700, icon: "👜" },
    
    // Sanat ve Kültür
    { name: "Kitap", category: "culture", basePrice: 150, icon: "📚" },
    { name: "Müzik Aleti", category: "culture", basePrice: 2000, icon: "🎸" },
    { name: "Film", category: "culture", basePrice: 800, icon: "🎬" },
    { name: "Oyun", category: "culture", basePrice: 1200, icon: "🎮" },
    { name: "Spor Malzemesi", category: "culture", basePrice: 900, icon: "⚽" }
];

// Şehir özel ürünleri
const citySpecialties = {
    // Türkiye
    istanbul: ["İpek Halı", "Baharat", "Mücevher", "Deniz Ürünleri"],
    ankara: ["İpek", "Mücevher", "Teknoloji", "Eğitim"],
    izmir: ["İncir", "Zeytin", "Şarap", "Deniz Ürünleri"],
    bursa: ["İpek", "Tekstil", "Otomobil", "Gıda"],
    antalya: ["Turizm", "Narenciye", "Deniz Ürünleri", "İnşaat"],
    
    // Almanya
    berlin: ["Teknoloji", "Sanat", "Müzik", "Eğitim"],
    munih: ["Bira", "Otomobil", "Teknoloji", "Turizm"],
    hamburg: ["Deniz Ürünleri", "Lojistik", "Ticaret", "Gemi"],
    
    // İngiltere
    london: ["Finans", "Teknoloji", "Moda", "Kültür"],
    manchester: ["Tekstil", "Sanayi", "Müzik", "Spor"],
    
    // Fransa
    paris: ["Moda", "Şarap", "Sanat", "Turizm"],
    lyon: ["İpek", "Kimya", "Gıda", "Otomobil"],
    
    // İtalya
    roma: ["Sanat", "Moda", "Turizm", "Gıda"],
    milano: ["Moda", "Tasarım", "Finans", "Teknoloji"],
    
    // İspanya
    madrid: ["Turizm", "Gıda", "Otomobil", "Enerji"],
    barcelona: ["Tekstil", "Deniz Ürünleri", "Teknoloji", "Turizm"],
    
    // Çin
    pekin: ["İpek", "Teknoloji", "İnşaat", "Gıda"],
    shanghai: ["Teknoloji", "Finans", "Lojistik", "Otomobil"],
    
    // Japonya
    tokyo: ["Teknoloji", "Otomobil", "Elektronik", "Manga"],
    osaka: ["Gıda", "Elektronik", "Tekstil", "Finans"],
    
    // Hindistan
    mumbai: ["İpek", "Baharat", "Teknoloji", "Film"],
    delhi: ["İpek", "Baharat", "Tekstil", "Gıda"],
    
    // ABD
    "new-york": ["Finans", "Teknoloji", "Moda", "Medya"],
    losangeles: ["Eğlence", "Teknoloji", "Turizm", "Uçak"],
    chicago: ["Sanayi", "Gıda", "Finans", "Ulaşım"],
    
    // Brezilya
    "sao-paulo": ["Kahve", "Et", "Otomobil", "Finans"],
    riodejaneiro: ["Turizm", "Petrol", "Deniz Ürünleri", "İnşaat"],
    
    // Kanada
    toronto: ["Finans", "Teknoloji", "Gıda", "Otomobil"],
    vancouver: ["Teknoloji", "Deniz Ürünleri", "Orman", "Turizm"],
    
    // Avustralya
    sydney: ["Madencilik", "Tarım", "Turizm", "Finans"],
    melbourne: ["Eğitim", "Sanat", "Gıda", "Teknoloji"],
    
    // Yeni Zelanda
    auckland: ["Süt", "Et", "Yün", "Turizm"],
    
    // Mısır
    kahire: ["Pamuk", "İpek", "Turizm", "Petrol"],
    
    // Nijerya
    lagos: ["Petrol", "Kakao", "İpek", "Teknoloji"],
    
    // Güney Afrika
    johannesburg: ["Elmas", "Altın", "Madencilik", "Tarım"]
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        worldData,
        regionPrices,
        tradeGoods,
        citySpecialties
    };
}
