/*
    citeDesDames, a script of to locate the presence of women in the
    toponyms inside a town
    Copyright (C) 2020, Philippe Gambette

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/
    
$(document).ready(function(){
  //Create leaflet map but hide it until the town is chosen
  var map;
  var zoomOk = false;
  $("#map").hide()
  $(".ville").hide();
  $(".btn").hide();
  
  var data;
  var communes;
  var themes;
  var themeLabels;
  var themeNumber;
  var foundNames = [];
  var nameNb = 0;
  var previousQuery = "";
  
  // expressions starting with "du" or "de" which may include people names
  var specialNames = ["du colonel ","du cdt ","du commandant ","du docteur ","du fr[èe]re ","du g[eé]n[eé]ral ","du lieutenant ","du ltdv ","du mar[eé]chal ","du p[èe]re ","du pasteur ","du professeur ","du sergent"];
  // list below derived from https://toolserver.org/~daniel/WikiSense/CategoryIntersect.php?wikilang=fr&wikifam=.wikipedia.org&basecat=Pr%C3%A9nom_masculin&basedeep=3&templates=&mode=al&go=Trouver&format=html&userlang=fr
  var maleFirstNames = ["Aaron","Abar","Abbas","Abd Ul-Latif","Abdel","Abdelkader","Abdoulaye","Abel","Abraham","Absbert","Achot","Adalbert","Adalbéron","Adalric","Adam","Adelin","Adem","Adhémar","Adib","Ado","Adolf","Adolphe","Adorján","Adriel","Adrien","Adélard","Adémar","Aed","Aelred","Agnel","Agrîn","Ahmad","Aiko","Aimable","Aimeric","Ako","Aladár","Alain","Alajos","Alassane","Alban","Albano","Albert","Alberto","Albéric","Alcide","Alcuin","Alessandro","Alexandre","Alexis","Alfio","Alfonso","Alfonz","Alfréd","Aliocha","Alioune","Alix","Aloïse","Alphonse","Alton","Alvin","Amadeus","Amadé","Amael","Amand","Amaury","Amine","Amir","Amr","Anas","Anasztáz","András","André","André","Andy","Anicet","Aniceto","Anoki","Anouar","Anssi","Antal","Anthony","Antoine-Marie","Antoine","Antonino","Anzelm","Apolo","Archibald","Archippe","Ardachès","Arduin","Ari","Ariihau","Aristide","Arisztid","Armand","Armin","Arnaud","Arnold","Arnoul","Arnould","Arolde","Arona","Arsène","Artúr","Asa","Asclettin","Ata","Athmane","Auguste","Aurelio","Aurél","Aurélien","Auxence","Avraham","Avtandil","Axel","Aykut","Aymeric","Baco","Bailey","Balázs","Barnabás","Bartholomée","Baris","Bassim","Bastian","Baudile","Baudouin","Bence","Bendegúz","Benedek","Beng","Benjamin","Benjámin","Benoît","Benoit","Beno","Berkant","Bernard","Bernát","Bertalan","Bertold","Bertrand","Bly","Boban","Bogdán","Boguslaw","Boldizsár","Bomboka","Bonabes","Bonifác","Bor","Boris","Botond","Boubacar","Brad","Branislav","Brian","Brian","Brice","Brieuc","Bruno","Bryan","Brúnó","Bud","Bulcsú","Bunta","Bálint","Béchir","Bódog","Calogero","Carl","Carles","Carlos","Charlemagne","Charles","Chayton","Chenouda","Cheveyo","Christian","Christophe","Chrodegang","Clarence","Clemens","Cliff","Clyde","Clément","Cléry","Colin","Conwoion","Corentin","Csaba","Csobán","Csongor","Cyprien","Cyrille","Cédric","César","Dakota","Damien","Damján","Daniel","Daoud","Darius","David","Denis","Dezsidérius","Dezso","Diego","Diego","Dimitry","Dimitri","Dirk","Doetval","Domonkos","Donát","Dorian","Dániel","Dávid","Dénes","Döme","Edin","Elemér","Elouan","Elvis","Elwan","Elod","Emmanuel","Emánuel","Engelger","Enguerrand","Enogat","Enored","Eon","Erich","Ernest","Erno","Ervin","Ethan","Eucher","Eudaric","Eugraphe","Eumaël","Ewen","Fabien","Fabrice","Farid","Farkas","Fatih","Fañch","Ferenc","Ferid","Fidèle","Flavio","Florent","Florian","Florimond","Flórián","Fouad","Foucault","France","Francesc","Francesco","Francis","Francisco","Francisque","Franck","Frank","Frantz","Franz","François","Frañsez","Fridtjof","Frigyes","Frédéric","Fulbert","Fumihiko","Fábián","Félicien","Félix","Fülöp","Gagik","Gamaliel","Garibald","Gasi","Gatien","Gaudin","Gaël","Geert","Gennaro","Gentien","Georges","Gergely","Gergo","Germain","Ghislain","Gilles","Giovanni","Girolamo","Godard","Godfred","Gonthier","Gonzague","Gonzalve","Goran","Gordius","Gottlob","Goulven","Goulwen","Grigol","Guglielmo","Guilhem","Guilherme","Guillaume","Gulstan","Gusztáv","Guy-Guy","Guy","Gwenvael","György","Gyozo","Gábor","Gáspár","Géza","Habib","Hafiz","Hans","Harald","Harm","Harold","Hassan","Hato","Hector","Hermann","Hiláriusz","Honoré","Huba","Hugolin","Hugues","Hussein","Håkan","Héribert","Ian","Ignác","Igor","Ilg","Illés","Imre","Ingenoc","Innocent","Isaac","Issam","István","Itamar","Jacopone","Jacques","Jacques-André","Jakab","Jarod","Jason","Jawad","Jean","Jean-Baptiste","Jean-Bedel","Jean-Charles","Jean-Jacques","Jean-Luc","Jean-Marie","Jean-Patrick","Jean-Pierre","Jefferson","Jeromos","Jessé","Joan","Johann","Johnny","Jon","Jonas","Jonathan","Jordi","Joshua","Josse","Josselin","Josué","Joël","Judicaël","Jules","Julien","Julio","Julius","Justin","Jusztin","Juvénal","Jérémie","Jérôme","Jésus","Jónás","József","Józsua","Kabanga","Kadosa","Karel","Karen","Kari","Karsa","Katuma","Kaïs","Keiji","Kemenes","Kenan","Kenny","Kepa","Keresztely","Khamis","Kieran","Kilián","Klemens","Koffi","Kolos","Konan","Konrád","Konstantin","Kont","Koppány","Kornél","Kotori","Kouadio","Kouakou","Kouamé","Kouassi","Kreshnik","Kristen","Kristóf","Krisztián","Kurt","Kálmán","Károly","Kélian","Laborc","Lajos","Lamoral","Lancelot","Laouenan","Lassana","Lawrence","Lehel","Lemmy","Lemuel","Levente","Liam","Lisandru","Louis","Loïc","Luc","Luc","Lucien","Lucius","Ludovic","Lázár","Lény","Lénárd","Léon","Léonard","Léonel","Léonore","Lóránt","Lorinc","Mabon","Madiale","Mads","Malhi","Malik","Malo","Mamadou","Manech","Manfred","Manish","Marc","Marian","Mario","Marius","Marnix","Maron","Martin","Masaru","Mathias","Matthias","Matthieu","Matti","Maurice","Maurice","Maximilien","Maël","Mbuyi","Melaine","Menhar","Menyhért","Michael","Michalis","Michel","Miguel","Mihály","Miklós","Miksa","Milan","Milandu","Milovan","Mircea","Moez","Mohammed","Mohand","Mokhtar","Morgan","Mornrod","Moulay","Moustapha","Moïse","Márkus","Márton","Mátyás","Máté","Médéric","Mózes","Nabil","Nacef","Nasreddine","Nassim","Natsume","Naël","Neil","Neilson","Nicola","Nicolas","Nigel","Nils","Nimród","Nino","Noureddine","Noël","Nuri","Nándor","Nárcisz","Némir","Oleg","Olf","Olier","Olivier","Olivér","Ompoly","Ond","Orbán","Orso","Osmond","Oszkár","Othmane","Ottó","Ouen De Rouen","Ousmane","Ozal","Paco","Pamphile","Pascal","Paszkal","Patrice","Patrick","Paul","Pedro","Philip","Pierre-Alexandre","Pierre-Antoine","Pierre-Augustin","Pierre-Claude","Pierre-François","Pierre-Philippe","Pierre","Pierrick","Pilan","Piusz","Pol","Prosper","Prudent","Pál","Pépin","Quentin","Quint","Quintien","Quintilien","Quinto","Quinton","Quintus","Rafik","Rajiv","Rajmund","Ramy","Raphaël","Ratian","Rayan","Rego","Renaud","René","Reza","Rezso","Richárd","Roberto","Rodrigue","Roland","Romain","Romaric","Roméo","Ronald","Ronan","Rorgon","Rosario","Roselin","Ruben","Rudolf","Ryo","Ryoichi","Régis","Róbert","Saad","Saburo","Saddam","Sahale","Salomon","Salîm","Sami","Samir","Samuel","Sasuke","Saül","Schangala","Sebestyén","Serge","Serlon","Seth","Shpend","Siegfried","Silo","Simon","Souleymane","Stanislas","Stark","Steeve","Sture","Surány","Susumu","Sven","Sylvain","Szabolcs","Szaniszló","Szilveszter","Sámson","Sámuel","Sándor","Sébastien","Sékou","Séraphin","Sören","Tadeusz","Tadi","Tamás","Tarek","Tariec","Tatien","Teddy","Tedi","Thiago","Thibaut","Thierry","Thorlak","Théodore","Théodôros","Tibor","Tiborc","Tihamér","Timót","Titien","Titouan","Titusz","Tobie","Toufic","Tristan","Trophime","Tugdual","Turgis","Turpin","Tyee","Tádé","Térence","Tóbiás","Uc","Ugor","Ulric","Ulysse","Ulászló","Ursicin","Ursin","Valentyn","Valter","Valère","Valéry","Vaneng","Vania","Vasco","Vianney","Victor","Victoric","Vijay","Vilmos","Vitalien","Vivien","Vlada","Vladimír","Vratislav","Waban","Wakiza","Walburga","Wapi","Wassim","Wataru","Wilhelm","Wilke","William","Wissem","Wyn","Xavier","Xavier","Yahto","Yancey","Yann","Yannis","Yao","Yasmine","Yekbun","Yeshoua","Yitzhak","Yoann","Yohann","Younès","Yul","Yuma","Yunus","Yuri","Yvan","Yvon","Zacharie","Zakuro","Zalán","Zinedine","Zlatan","Zoltán","Zsigmond","Zsolt","Zsombor","Zéphyrin","Ábel","Ábrahám","Ádám","Ágoston","Ákos","Álmos","Álpár","Álvaro","Ányos","Áron","Édouard","Élie","Élisée","Éloi","Émile","Éphise","Éric","Étienne","Örs","Abdallah","Abdelaziz","Abdelaziz Moussa","Abdelhafid","Abdelhakim","Abdelhamid","Abdelkarim","Abdellah","Abdellatif","Abdelmajid","Ahmed","Alain Charles","Alexander","Alexandru","Alexei","Alfred","Alfredo","Ali","Alonso","Amadou","Anatole","Andras","Andrei","Andrew","Andrzej","Angelo","Anthony Roland","Anton","Antonio","Arnak","Arnauld","Arnoldo","Arthur","Augustin","Aziz","Benoit","Bernhard","Blaise","Boniface","Carlo","Charles-André","Charles-Emmanuel","Charles-Henri","Charles-Henry","Christoph","Christopher","Christos","Constantin","Cristian","Daniel John","Daniel-Henri","Daniel-Louis","Didier","Djalil","Djallal","Djamal","Djamel","Edgar","Edmond","Edmond-Paul","Edoardo","Edouard","Eduardo","Edward","Emannuel","Emanuel","Emile","Eric","Eric Joël","Erick","Erik","Erwan","Etienne","Eugène","Fabio","Fabrizio","Fayçal","Felix","Ferdinand","Fernand","Fernando","Floreal","Francois","François Guy","François Joseph","Francois Xavier","François-Michel","François-Paul","François-Pierre","Francois-Xavier","Freddy","Frederic","Gabriel","Gael","Gaétan","Gaetano","Geoffrey","Georges-Henri","Georges-Jean","Georges-Louis","Georges-Marie","Gerald","Gérald","Gerard","Gérard","Gilbert","Gildas","Giorgio","Giuseppe","Gregoire","Grégoire","Gregorio","Grégorio","Gregory","Grégory","Guido","Guy-Michel","Guylain","Henri","Henri-François","Henri-Jean","Henri-Jose","Henri-Michel","Henri-Paul","Henry","Henry-Michel","Herve","Hervé","Hichem","Hubert","Hugo","Ioan","Ivan","Jacques Guillaume","Jacques-Henri","Jacques-Olivier","Jamal","Jamel","James","Javier","Jean","Jean Yves","Jean Antoine","Jean Bruno","Jean Charles","Jean Christophe","Jean Claude","Jean David","Jean Dominique","Jean François","Jean Gabriel","Jean Gael","Jean Jacques","Jean Jose","Jean Louis","Jean Loup","Jean Marc","Jean Marie","Jean Michel","Jean Paul","Jean Philippe","Jean Pierre","Jean-Alain","Jean-Antoine","Jean-Arnaud","Jean-Benoit","Jean-Benoît","Jean-Bernard","Jean-Bruno","Jean-Christian","Jean-Christophe","Jean-Claude","Jean-Cyrille","Jean-Daniel","Jean-David","Jean-Denis","Jean-Didier","Jean-Dominique","Jean-Emile","Jean-Emmanuel","Jean-Eric","Jean-Etienne","Jean-Fabien","Jean-Fabrice","Jean-Félix","Jean-François","Jean-Frederic","Jean-Frédéric","Jean-Gabriel","Jean-Gérard","Jean-Guy","Jean-Herve","Jean-Hugues","Jean-Jack","Jean-Joel","Jean-José","Jean-Laurent","Jean-Léon","Jean-Loïc","Jean-Louis","Jean-Loup","Jean-Manuel","Jean-Marc","Jean-Marcel","Jean-Marin","Jean-Martial","Jean-Maurice","Jean-Max","Jean-Michel","Jean-Nicolas","Jean-Noel","Jean-Noël","Jean-Pascal","Jean-Paul","Jean-Philip","Jean-Philippe","Jean-Raymond","Jean-Remi","Jean-Rémi","Jean-René","Jean-Richard","Jean-Robert","Jean-Sebastien","Jean-Sébastien","Jean-Sylvestre","Jean-Thierry","Jean-William","Jean-Yves","Jérémy","Jerome","Jérome","Jerôme","Jesper","Joachim","Joel","Joffroy","Johan","Johannes","John","John Victor","Jorg","Jörg","Jorge","Jose","José","Joseph","Juan","Jurgen","Kamel","Karim","Khalil","Klaus","Kristiaan","Kristian","Krzysztof","Lars","Laszlo","László","Laurent","Leonard","Leonid","Lionel","Loic","Lotfi","Louis-Andre","Louis-Jean","Louis-Rachid","Lucian","Luciano","Mahfoud","Manuel","Marc Antoine","Marc Pierre","Marc-André","Marc-Antoine","Marc-Arthur","Marc-Eric","Marc-Etienne","Marc-Henri","Marcel","Marcel-René","Marcello","Marco","Marcus","Mariusz","Mark","Mark Oliver","Markos","Markus","Martial","Massimo","Mathieu","Matteo","Maurizio","Max","Maxime","Mehdi","Mehmet","Michaël","Michel Louis","Michel-Ange","Mickael","Mickaël","Mihai","Mikael","Mikhail","Mohamad","Mohamed","Moncef","Mounir","Moussa","Moustafa","Mustapha","Nestor","Nicholas","Nick","Nicolay","Nikolay","Nikos","Noel","Norbert","Omar","Paolo","Patricio","Patrick Pierre","Paul Valentin","Paul-André","Paul-Emile","Paul-Henri","Paul-Henry","Paul-Laurent","Paul-Louis","Paul-Louis","Pete","Peter","Philippe","Phillipe","Pierluigi","Pierre Albert","Pierre Andre","Pierre Antoine","Pierre Eric","Pierre Jean","Pierre Michel","Pierre Patrick","Pierre Paul","Pierre Philippe","Pierre Yves","Pierre-Alain","Pierre-Albert","Pierre-Andre","Pierre-André","Pierre-Charles","Pierre-Cyrille","Pierre-Damien","Pierre-Edmond","Pierre-Emmanuel","Pierre-Etienne","Pierre-Francois","Pierre-Gilles","Pierre-Henri","Pierre-Henry","Pierre-Jean","Pierre-Louis","Pierre-Luc","Pierre-Marie","Pierre-Michel","Pierre-Noel","Pierre-Noël","Pierre-Olivier","Pierre-Paul","Pierre-Régis","Pierre-Sylvain","Pierre-Vincent","Pierre-Xavier","Pierre-Yannick","Pierre-Yves","Rachid","Rafael","Ralf","Ralph","Raoul","Raphael","Raymond","Rédouane","Refik","Regis","Remi","Rémi","Remy","Rémy","René-Louis","Reynald","Ricardo","Richard","Rinaldo","Robert","Rodolphe","Roger","Rolf","Romuald","Rudolph","Rudy","Ruedi","Ryad","Said","Saïd","Salvador","Salvatore","Samy","Sandro","Sebastien","Serge-Pierrick","Sergio","Sergiu","Sergueï","Shahid","Slimane","Sofiane","Stefan","Stefano","Stéfano","Steffen","Stephan","Stéphan","Stephen","Steve","Steven","Tanguy","Tarik","Tayeb","Terence","Terry","Theo","Thibaud","Thibault","Thomas","Timothy","Tobias","Tonio","Tony","Toufik","Trevor","Ulrich","Urbain","Valentin","Victorien","Viktor","Vincent","Vladimir","Walid","Walter","Werner","Wilfrid","Wladimir","Wojciech","Wolf-Dieter","Wolfgang","Yacine","Yannick","Yasser","Yassine","Youssef","Youssoufi","Anis","Antonin","Ayman","Baptiste","Basile","Bastien","Cedric","Célestin","Charles-Antoine","Charles-Edouard","Charles-Elie","Charles-Gabriel","Claudio","Clement","Colas","Dieudonné","Donald","Donatien","Donato","Driss","Elie","Enrico","Federico","Felipe","Filippo","Floréal","François-Elie","François-Jacques","François-Olivier","François-Xavier","Frédérick","Frédérik","Gaëtan","Gauthier","Gautier","Geoffray","Geoffroy","Georgio","Giacomo","Gwenaël","Hakim","Hicham","Ibrahim","Ioannis","Ismaël","Ismail","Jacob","Jaroslaw","Jean-Barthélémy","Jean-Francois","Jean-Hubert","Jean-Mathieu","Jean-Matthieu","Jean-Nazaire","Jean-Raphaël","Jean-Romain","Jean-Samuel","Jeremy","Jimmy","Joffrey","Kenneth","Kevin","Kévin","Khaled","Khalid","Konstantinos","Léo","Lorenzo","Lucas","Luis","Luís","Luiz","Mahmoud","Mateo","Mélaine","Mikaël","Mohammad","Mouhamadou","Mourad","Muhammad","Nathan","Nathanaël","Ossama","Oumar","Oussama","Panagiotis","Paulin","Paulo","Pavel","Pawel","Petr","Philipe","Philippe-Emmanuel","Pierre-Adrien","Pierre-Alexis","Pierre-Edouard","Pierre-Elie","Pierre-Emile","Pierre-Eric","Pierre-Karim","Pierre-Loïc","Pierre-Malo","Radhouène","Rafic","Riccardo","Rodrigo","Ruppert","Sebastian","Sébastian","Sebastián","Taoufik","Théo","Wenceslas","Yaël","Yohan","Yousef","Youssouf","Yves","Colonel ","Cdt","Commandant","Docteur","Frère","Général","General","Lieutenant","Ltdv","Marechal","Maréchal","Mal","Père","Pere","Pasteur","Professeur","Sergent"];
  // list below derived from https://toolserver.org/~daniel/WikiSense/CategoryIntersect.php?wikilang=fr&wikifam=.wikipedia.org&basecat=Pr%C3%A9nom_f%C3%A9minin&basedeep=3&mode=al&go=Trouver&userlang=fr
  var femaleFirstNames = ["Abequa","Abey","Abeytu","Abigaëlle","Abigél","Ada","Adelgunde","Adelmire","Adjoua","Ado","Adrienn","Adrienne","Adèle","Adélaïde","Adélie","Aemi","Afaf","Affoué","Afida","Agathe","Agnès","Agáta","Ahou","Aika","Aiko","Aimée","Aina","Aissatou","Akane","Aki","Akisa","Akissi","Albane","Aldegonde","Alessia","Aletta","Alexandra","Alice","Alicia","Alida","Aline","Alizé","Aliénor","Almudena","Aloïse","Alwena","Alíz","Ama","Amael","Amandine","Amenan","Amina","Aminata","Amoin","Amparo","Amy","Amália","Anaba","Anahis","Anastázia","Anaïs","Andrika","Andrée","Anett","Angelika","Angeni","Angéla","Angélique","Anicet","Anikó","Anissa","Anja","Anka","Annamária","Annick","Annwenn","Anon","Anouch","Antoinette","Antonella","Antonine","Antónia","Anya","Anyssa","Apollonia","Apollónia","Aponi","Aquene","Arabella","Aranka","Ari","Arielle","Asa","Assa","Astrid","Aude","Audierne","Audrey","Auguszta","Aurielle","Aurélie","Ava","Awa","Aya","Ayaka","Ayiana","Aylin","Ayu","Ayse","Azza","Aïssata","Bahia","Barbara","Bea","Beate","Bena","Bernadette","Bestine","Beth","Bettina","Beáta","Bianka","Biborka","Bintou","Blande","Blandine","Blanka","Blythe","Blésille","Boglárka","Borbála","Brigitta","Brigitte","Béatrice","Bénédicte","Bérengère","Canan","Candice","Carina","Carine","Carlota","Carmen","Cassie","Catherine","Cathy","Cecília","Charlotte","Charlène","Chenoa","Cheyanne","Chilali","Chloé","Cholena","Christa","Christelle","Christiane","Christine","Chumani","Cindy","Claire","Clara","Claudine","Clélia","Clémence","Clémentine","Coahoma","Coline","Conception","Cora","Coralie","Corentine","Corinne","Cornelia","Creirfyw","Cristiana","Csenge","Csilla","Csillag","Cynthia","Cécile","Cécilia","Célia","Céline","Césarie","Dagmar","Daisy","Dalma","Damaris","Daniella","Daria","Delphine","Dena","Derya","Dezba","Diane","Dilara","Dita","Diána","Djehina","Djenaba","Doli","Domitille","Donoma","Doralice","Doriane","Dorina","Doris","Dorottya","Douchka","Dyani","Dévote","Dóra","Eba","Edburge","Edit","Ehawee","Elena","Eleonóra","Elfi","Elif","Elsa","Elvire","Elza","Ematelwaheb","Emese","Emi","Emma","Emmanuelle","Emoke","Eniko","Enola","Erell","Erina","Erina","Erzsébet","Esa","Estelle","Eszter","Etania","Etelka","Ethete","Eugénie","Eulalie","Eusoye","Eusébie","Eva","Eylem","Eyota","Fabiola","Fadila","Fanchon","Fanni","Fanny","Fanélie","Farida","Fatima","Fatimata","Fatime","Fatou","Fatoumata","Faustine","Fehérke","Feliciane","Felícia","Fina","Firmine","Flavia","Fleur","Florence","Florie","Florise","Flóra","France","Francesca","Franciska","Françoise","Fruzsina","Gabrielle","Gaby","Gaïa","Geneviève","Georgina","Gertrude","Ghofrane","Ginetta","Gisèle","Giulia","Gizella","Gladys","Glenda","Gorgonie","Gretchen","Guenièvre","Guilhemine","Gunda","Gwendoline","Gwenola","Gwynneth","Gyöngyi","Györgyi","Gül","Habiba","Hachi","Hajnalka","Halona","Hana","Hanae","Hanane","Hannelore","Hasret","Hateya","Hatice","Hayate","Helga","Heta","Hillary","Hinaiti","Hortense","Huguette","Huyana","Huê","Hédi","Héloïse","Hélène","Ibolya","Ibtissam","Ide","Ildikó","Ilsa","Imala","Ingrid","Inès","Irina","Iris","Irène","Irén","Isabella","Isabelle","Isi","Isoline","Ita","Itta","Itte","Iva","Ivett","Izabella","Izolina","Izusa","Jacqueline","Janet","Janka","Jasmine","Jennifer","Jenny","Jessica","Joana","Joanne","Jolene","Jolán","Josette","Josèphe","Josée","Joséphine","Judit","Judith","Julianna","Julianne","Julie","Julie","Jusztina","Jácinta","Kachina","Kadiatou","Kaho","Kahsha","Kaliska","Kamilia","Kanda","Kaouthar","Karen","Kari","Karin","Karina","Karine","Karola","Karolin","Katalin","Kate","Kathy","Katia","Katie","Kató","Kawtar","Kenza","Kerstin","Kewanee","Kim","Kinta","Kiona","Kionna","Kishi","Klarissza","Klaudia","Kleopátra","Klervi","Klára","Kohana","Kornélia","Kristen","Krisztina","Lailani","Lalie","Lara","Larissa","Laura","Laure","Laureline","Laurene","Laurine","Leeloo","Leelou","Leila","Lenke","Leonóra","Leotie","Levanah","Lilia","Liliane","Liliána","Lilla","Lily","Linda","Linoa","Lisa","Litonya","Livia","Loane","Lola","Lomasi","Loreena","Lorraine","Lotte","Lou-Ann","Lou-Anna","Lou-Anne","Louise","Louna","Lucette","Lucia","Lucie","Lucinda","Ludivine","Ludmila","Lukrécia","Lulu","Lydie","Lylou","Lætitia","Léa","Léocadie","Léonore","Lídia","Lívia","Macha","Macrine","Madeleine","Madeline","Maelle","Maeva","Magali","Magdolna","Magena","Mahala","Majdouline","Makura","Malika","Malina","Mami","Mansi","Margit","Margot","Marguerite","Mariam","Mariannick","Marie","Marie-Françoise","Marie-Isabelle","Marie-José","Marie-Élisabeth","Marie Claire","Marielle","Marina","Marine","Marisol","Marjorie","Marlène","Marozie","Martina","Martine","Maryannick","Mauricette","Maylis","Maïssa","Maïssane","Maïté","Maïwenn","Mehtap","Meike","Melissa","Melissa","Melánia","Mercedes","Mercédesz","Merve","Micheline","Michelle","Midori","Migina","Mireille","Mirella","Miriam","Mirjam","Monica","Monique","Morgan","Moseka","Mounia","My","Mylène","Mária","Márk","Márta","Mélanie","Mélina","Méline","Mélisande","Mélissandre","Méloé","Mónika","Nadine","Nadjia","Nadège","Nahima","Nahimana","Naila","Naima","Najwa","Namata","Nana","Natane","Natasha","Nathalie","Natsume","Naïa","Neima","Nelly","Nethra","Nicola","Nikolett","Nikoletta","Nirvelli","Nita","Nokomis","Nolwen","Nonna","Noémie","Nuna","Nóra","Odile","Odina","Oihana","Oksana","Olathe","Olenka","Olga","Olivia","Olivia","Ondine","Oneca","Oneida","Oriane","Ornella","Orsolya","Otília","Oumm Koulthoum Bint Mouhammed","Oumou","Ozalee","Paloma","Pamela","Pannonique","Papina","Parascève","Pascale","Patricia","Paule","Pauline","Pavla","Pazanne","Peggy","Perrine","Petunia","Pexine","Pezenne","Pia","Pilar","Piroska","Pitère","Poloma","Prescilla","Prisca","Prune","Catégorie:","Pulchérie","Pálma","Pécine","Pélagie","Pétronille","Pinar","RIM","Rachel","Rachida","Rahmatoullah","Ramóna","Rania","Raphaëlle","Rebecca","Remedios","Renáta","Rhoshandiatelly-Neshiaunneveshenk Koyaanfsquatsiuty","Rinko","Rislene","Rokia","Romane","Rosalie","Rosario","Rose","Roseline","Rosella","Roween","Roxana","Roxanne","Rozália","Ruqayya Bint Mouhammed","Ráhel","Réka","Sabine","Sabra","Safia","Sakina","Salomé","Samantha","Sandra","Sandrine","Sarah","Sarolta","Saveria","Saïda","Selma","Servane","Seynabou","Shirin","Sibel","Sihem","Sika","Silvia","Snöfrid","Soamaraina","Sokayna","Solange","Soline","Solveig","Solène","Sonia","Sophie","Sora","Soraya","Stella","Stéphanie","Suzanne","Svetlana","Sylvia","Sylvie","Szabina","Szandra","Szeréna","Szilvia","Szimonetta","Szonja","Sára","Sâbrine","Séraphine","Sita","Tala","Talitha","Tamahzouzte","Tamara","Tamsyn","Tata","Tatiana","Tawana","Teréz","Terézia","Thelma","Thu Huong","Théodechilde","Thérèse","Tia","Tiphaine","Touria","Trina","Tímea","Tünde","Ulrike","Ursula","Vaitiare","Valéria","Valérie","Vania","Veronika","Victoire","Victorine","Viktória","Vinciane","Violaine","Virginie","Virág","Viviane","Vlada","Véronique","Wakanda","Waltraud","Wihakayda","Wilma","Winema","Winona","Wivine","Xavière","Xebat","Yasmine","Yayoi","Yekbun","Yepa","Yolaine","Yolande","Yordanka","Ysaline","Ysoie","Ysé","Yuina","Yumi","Yuri","Zakuro","Zaltana","Zarmina","Zaynab Bint Mouhammed","Zelda","Zenaëlle","Zeynep","Zina","Zita","Zohra","Zoltána","Zora","Zouina","Zsanett","Zsuzsa","Zsuzsanna","Zsófi","Zulejka","Zélie","Zénaïde","Ágnes","Ágota","Árvácska","Çigdem","Édelmire","Édith","Élisabeth","Éloïse","Éléonore","Éléovna","Émilie","Émilienne","Éolia","Évangéline","Írisz","Özgü","Adeline","Agata","Agnes","Agnés","Agnieszka","Aissa","Aïssa","Alexa","Alicja","Aliyah","Amanda","Ana","Anabelle","Anca","Andree","Angela","Angelina","Angelita","Anita","Ann","Anna","Anna-Bella","Anne","Anne Laure","Anne Marie","Anne-Blandine","Anne-Catherine","Anne-Cécile","Anne-Dominique","Anne-Francoise","Anne-Genevieve","Anne-Laure","Anne-Lise","Anne-Magali","Anne-Marie","Anne-Paule","Anne-Rachel","Anne-Sophie","Annelise","Annette","Annie","Annik","Anny","Antigone","Antonia","Ariane","Arlette","Armelle","Aurelia","Aurélia","Beatrice","Beatrix","Betty","Carole","Caroline","Caterine","Cecile","Cecilia","Celine","Chantal","Christel","Christilla","Christina","Chrystel","Claudia","Claudie","Clotilde","Colette","Constance","Corine","Cristina","Cyril","Dan","Danièle","Danielle","Danijela","Denise","Dolorès","Drina","Edith","Edwige","Eléna","Eleonore","Eliane","Elisabeth","Elisabetta","Elisha","Elizabeth","Elodie","Elyette","Emily","Eva-Maria","Evanghelia","Eve","Eve-Isabelle","Eveline","Evelyn","Evelyne","Ewa","Fabienne","Fathia","Fatiha","Flora","Francine","Francoise","Frédérique","Gabriella","Gaëlle","Genevieve","Georgine","Geraldine","Géraldine","Ghislaine","Giuseppina","Gloria","Gwénaële","Gwenaelle","Hafsa","Helena","Helene","Héléne","Heloïse","Henriette","Irene","Isabel","Janine","Jeanine","Jeanne","Jeanne Henriette","Jeannine","Joanna","Jocelyne","Joelle","Joëlle","Johanna","Josepha","Josiane","Joyce","Julia","Juliette","Katheline","Kathrin","Katja","Laetitia","Latifa","Lauréline","Lena","Lilianne","Line","Lioudmila","Lise","Loraine","Lorenza","Lucienne","Lucile","Lucy","Luisa","Lydia","Magalie","Magdalena","Maguelonne","Manuela","Marcela","Mareike","Margareta","Margrit","Margueritte","Maria","Maria Antonietta","Maria Cecilia","Maria Graciete","Maria Luisa","Maria Paola","Maria Teresa","María-Eugenia","Marianne","Marie Anne","Marie Annick","Marie Christine","Marie Claude","Marie Francoise","Marie Josephe","Marie Madeleine","Marie Paule","Marie Rose","Marie-Aleth","Marie-Alice","Marie-Aline","Marie-Alix","Marie-Andree","Marie-Ange","Marie-Angèle","Marie-Anne","Marie-Annick","Marie-Antoinette","Marie-Bernadette","Marie-Cecile","Marie-Cécile","Marie-Charlotte","Marie-Christine","Marie-Claire","Marie-Claude","Marie-Dominique","Marie-Edith","Marie-Elisabeth","Marie-Elodie","Marie-Eve","Marie-France","Marie-Frederique","Marie-Geneviève","Marie-Helene","Marie-Hélène","Marie-Jean","Marie-Jo","Marie-Joëlle","Marie-Jose","Marie-Joseph","Marie-Josèphe","Marie-Laure","Marie-Lazarine","Marie-Line","Marie-Lise","Marie-Louise","Marie-Luce","Marie-Lyne","Marie-Lyse","Marie-Madeleine","Marie-Noële","Marie-Noelle","Marie-Noëlle","Marie-Odile","Marie-Paule","Marie-Pierre","Marie-Roberte","Marie-Rose","Marie-Sol","Marie-Thérèse","Marie-Vic","Mariella","Mariette","Marinette","Marion","Marlene","Marylène","Maryline","Maryse","Maryvonne","Mathilde","Maud","Maureen","Michela","Michèle","Mihaela","Muriel","Murielle","Myriam","Nabila","Nadia","Naïma","Nancy","Natacha","Natalie","Nicole","Noelie","Noëlle","Nora","Odette","Parina","Parisa","Patrizia","Paulette","Petra","Philomène","Pierrette","Rafaelle","Raphaelle","Raymonde","Regine","Régine","Renee","Riitta","Rita","Rolande","Rosa","Rose Noelle","Rose-Marie","Rose-Noëlle","Roselyne","Rosemarie","Rosemary","Ruxandra","Saadia","Sabrina","Sara","Sarra","Serena","Severine","Séverine","Sheila","Shirley","Sibylle","Simone","Stacey","Stefania","Stefanie","Stephanie","Susan","Susana","Susanne","Suzie","Svetla","Sybille","Sylvette","Sylviane","Sylvie-Anne","Tassadit","Teresa","Theresa","Therese","Valentine","Valeria","Valerie","Vanessa","Véréna","Veronique","Vincenette","Wanda","Wendy","Xénia","Alexia","Alina","Amélie","Annabelle","Anne-Céline","Anne-Claire","Anne-Claude","Anne-Elisabeth","Anne-Emmanuelle","Anne-Gaëlle","Anne-Katharina","Anne-Lorraine","Anne-Sylvie","Anne-Valérie","Asma","Asmaa","Aurore","Axelle","Beatriz","Béatriz","Berangere","Bérangère","Camila","Camilla","Capucine","Carla","Carolina","Catalina","Catharina","Cendrine","Charline","Chiara","Chloe","Chloë","Claire-Emilie","Claire-Lise","Claire-Marie","Clarisse","Cyndie","Cyrielle","Dalila","Daniela","Daphné","Deborah","Déborah","Diana","Djamila","Dorothea","Dorothee","Dorothée","Ekaterina","Eleonora","Eléonore","Elisa","Elise","Emanuela","Emeline","Emilia","Emilie","Enrica","Eva-Marie","Evangeline","Evgénia","Fatma","Federica","Flore","Florencia","Floriane","Gabriela","Gaëla","Gaelle","Georgeta","Georgiana","Ghyslaine","Gwenaëlle","Gwladys","Hakima","Halima","Honorine","Ibrahima","Imen","Imène","Ioana","Jane","Janice","Jeanne-Marie","Jeannette","Jihane","Jimena","Jocelyn","Johanne","Juana","Juanita","Juliana","Juliane","Justine","Karima","Katarzina","Katarzyna","Katrine","Katryn","Kattya","Khadidja","Khadija","Laeticia","Laëtitia","Lamia","Laureen","Laurène","Laurette","Lauriane","Laurianne","Laurie","Lea","Leïla","Lina","Lydie-Sarah","Lynda","Maëlla","Maëlle","Maéva","Maëva","Magali-Lina","Magally","Mariana","Marianna","Marie-Agnès","Marie-Amélie","Marie-Andrée","Marie-Béatrice","Marie-Belle","Marie-Carmen","Marie-Caroline","Marie-Clotilde","Marie-Gaëlle","Marie-Jeanne","Marie-Josée","Marie-Lou","Marie-Lys","Marie-Michelle","Marie-Nathalie","Marie-Renée","Marieke","Mariem","Marilyn","Marilyne","Marjolaine","Marjolein","Marta","Maryam","Maya","Mélissa","Meriem","Merryl","Meryem","Milena","Mouna","Nassima","Natalia","Nataliya","Nathanaëlle","Nina","Nolwenn","Norma","Olena","Oléna","Olfa","Ophélie","Panagiota","Pascaline","Paula","Paulina","Priscilla","Priscille","Ramona","Rosana","Rose-France","Roxane","Ruth","Sabina","Samira","Sana","Sanaa","Sidonie","Simona","Valentina","Veronica","Verónica","Véronika","Victoria","Violeta","Violette","Virginia","Yaëlle","Yasmina","Yassmine","Zoé","Zoë","Zuzanna","Élisa","Dame","Madame","Miss"];


  // Prepare town list
  // Autocomplete departments
  var depts = ["Ain","Aisne","Allier","Alpes-de-Haute-Provence","Hautes-Alpes","Alpes-Maritimes","Ardèche","Ardennes","Ariège","Aube","Aude","Aveyron","Bouches-du-Rhône","Calvados","Cantal","Charente","Charente-Maritime","Cher","Corrèze","Corse-du-Sud","Haute-Corse","Côte-d’Or","Côtes-d'Armor","Creuse","Dordogne","Doubs","Drôme","Eure","Eure-et-Loir","Finistère","Gard","Haute-Garonne","Gers","Gironde","Hérault","Ille-et-Vilaine","Indre","Indre-et-Loire","Isère","Jura","Landes","Loir-et-Cher","Loire","Haute-Loire","Loire-Atlantique","Loiret","Lot","Lot-et-Garonne","Lozère","Maine-et-Loire","Manche","Marne","Haute-Marne","Mayenne","Meurthe-et-Moselle","Meuse","Morbihan","Moselle","Nièvre","Nord","Oise","Orne","Pas-de-Calais","Puy-de-Dôme","Pyrénées-Atlantiques","Hautes-Pyrénées","Pyrénées-Orientales","Bas-Rhin","Haut-Rhin","Rhône","Haute-Saône","Saône-et-Loire","Sarthe","Savoie","Haute-Savoie","Paris","Seine-Maritime","Seine-et-Marne","Yvelines","Deux-Sèvres","Somme","Tarn","Tarn-et-Garonne","Var","Vaucluse","Vendée","Vienne","Haute-Vienne","Vosges","Yonne","Territoire de Belfort","Essonne","Hauts-de-Seine","Seine-Saint-Denis","Val-de-Marne","Val-d’Oise"];
  var num = ["01","02","03","04","05","06","07","08","09",
  "10","11","12","13","14","15","16","17","18","19",
  "2A","2B","21","22","23","24","25","26","27","28","29",
  "30","31","32","33","34","35","36","37","38","39",
  "40","41","42","43","44","45","46","47","48","49",
  "50","51","52","53","54","55","56","57","58","59",
  "60","61","62","63","64","65","66","67","68","69",
  "70","71","72","73","74","75","76","77","78","79",
  "80","81","82","83","84","85","86","87","88","89",
  "90","91","92","93","94","95"];
  var i = 0;
  var liste = [];
  var listeVilles = [];
  while(i<num.length){
     liste.push(num[i]+" "+depts[i]);
     i++;
  }

  $('#department').autocomplete({
     source : liste
  });

  $('#ville').autocomplete({
     source : listeVilles
  });

  // Get all towns in the department and show them
  function getDpt(){
      data = $.getJSON("./data/OSM-communes-codeInseeOsm.json-"+$("#department").val().slice(0,2)+".json",function(data){
        listeVilles = Object.keys(data.communes);
        //console.log(data);
        communes = data.communes;
        $('#ville').off("autoComplete");
        $('#ville').autocomplete({
           source : listeVilles
        });
        $('.ville').show();
      }).fail(function( jqxhr, textStatus, error ) {
        var err = textStatus + ", " + error;
        console.log( "Request Failed: " + err );
      });
  }
  
  $("#department").on("autocompleteselect",function(){
     // Display the town field
     setTimeout(getDpt,200);
  })  

  function getCity(){
    $('.btn').show();
  }
  
  $("#ville").on("autocompleteselect",function(){
     // Display the city validation button
     setTimeout(getCity,200);
  })
  
  // Extract coordinates from the input string
  function analyzeCoord(str){
     var result = "";
     var patternStart = ["POLYGON ((","POINT (","MULTIPOLYGON ((("];
     var patternStop = [",",")",","];
     var i = 0
     var patternFound = false;
     patternStart.forEach(function(p){
        if(str.slice(0,p.length) == p){
           var posStop = str.search(patternStop[i]);
           result = str.slice(p.length,posStop);
           i++;
           patternFound++;
        }
     })
     if(!patternFound){
       result = str;
     }
     return result;
  }
  
  // Extract possible people name from the input location name, depending on the type of location
  function analyzeName(locationName,type){
     var result = "";
     var allPrefixes = {
     "sports":["Boule lyonnaise ","Boulodrome ","Boulodrome couvert ","Centre nautique ","Centre Sportif ","City Stade ","Complexe ","Complexe sportif ","Dojo ","École De Danse ","Espace ","Halle ","Halle sportive ","Gymnase ","Gymnase scolaire ","Jeu de boules ","Le centre ","Mini Football ","Palais des Sports ","Piscine ","Piscine municipale ","Piste d'athlétisme ","Piste d'athletisme ","Plateau Sportif ","Plateaux sportifs ","Salle ","Salle de boxe ","Salle de sport ","Salle de sports ","Salle omnisports ","Skate-Park ","Square ","Stade ","Stade municipal ","Tennis Club ","Tennis Club municipal ","Terrain ","Terrain de football ","Terrain de proximité ","Vélodrome ",".*Vélodrome "],
     "education":[".*B[aâ]timent ","Crèche Municipale ","Coll[eè]ge[ ]*(public|privé)* ","[ÉE]cole[ ]*([ÉE]l[eé]mentaire|maternelle|primaire|technique|technologique)*[ ]*(d'application )*[ ]*(privée|publique)* ","Espace ","Groupe scolaire ","Institut ","Institution ","Lycée[ ]*(général|général et technologique|polyvalent|professionnel|professionnel|technologique|technique)*[ ]*(et technologique)*(public|privé|.*restauration)* "],
     "library":["Biblioth[èe]que[ ]*(centrale|communale|d[eé]partementale|municipale)* ","M[ée]diath[èe]que[ ]*(centrale|communale|d[eé]partementale|municipale)* "],
     "address":["All[ée]e ","Avenue ","Boulevard ","Chemin ","Cours ","Impasse ","Passage ","Petite rue ","Pl ","Place ","Promenade ","Rue ","Ruelle ","Sente ","Sentier ","Square "]
     };
     var prefixes ;
     if(type == "address"){
       prefixes = allPrefixes["address"];
     } else {
       prefixes = allPrefixes[themes[themeNumber]];
     }
     var i = 0;
     while(i<prefixes.length){
        var tryRegexp = locationName.replace(new RegExp("^"+prefixes[i], "ig"), "")
        if(tryRegexp.length < locationName.length){
           result = tryRegexp ;
        }
        i++;
     }
     return result;
  }
  
  // Query the Geodatamine API to get all locations of a given theme in the town
  function sendGeodatamineQuery(){
    $.get("https://geodatamine.fr/data/"+themes[themeNumber]+"/"+communes[$("#ville").val()][1])
    .done(analyzeGeoData)
    .fail(function( jqxhr, textStatus, error ) {
      var err = textStatus + ", " + error;
      console.log( "Request Failed: " + err );
    });
  }
  
  // Send SPRAQL query
  function makeSPARQLQuery( endpointUrl, sparqlQuery, doneCallback ) {
	  var settings = {
		  headers: { Accept: 'application/sparql-results+json' },
	 	  data: { query: sparqlQuery }
	  };
	  return $.ajax( endpointUrl, settings ).then( doneCallback );
  }
  
  // Analyze the results from Wikidata to check if a person has been found
  function wikidataNameResults(data){
    var person = foundNames[nameNb];
    if(data.results.bindings.length>0){
		  if(data.results.bindings[0].personLabel != undefined){
		    person = data.results.bindings[0].personLabel.value;
		  }
		  var description = ""
		  if(data.results.bindings[0].personDescription != undefined){
		    description = " ("+data.results.bindings[0].personDescription.value+")";
		  }
		  var genderLabel = "";
		  if(data.results.bindings[0].genderLabel != undefined){
		    genderLabel = data.results.bindings[0].genderLabel.value;
		  }
		  $( '.foundName'+nameNb ).each(function(){
		    $(this).append('<td><a target="_blank" href="'+data.results.bindings[0].person.value+'">'+person+description+'</a></td><td>'+genderLabel+'</td><td></td>');
		    if(genderLabel == "féminin" || genderLabel == "femme transgenre"){
		       var coordinates = $(this).find(".coord").html();
		       if(!zoomOk){
		          map.setView([coordinates.split(" ")[1],coordinates.split(" ")[0]], 11);
		          zoomOk = true;
		          //console.log("Zoom sur :"+coordinates);
		       }
		       L.marker([coordinates.split(" ")[1],coordinates.split(" ")[0]]).addTo(map).bindPopup($(this).find(".placeName").html()+' :<br><a target="_blank" href="'+data.results.bindings[0].person.value+'">'+person+description+"</a>");
		    }
		  });
		  // Look for the next name on Wikidata
	    nameNb++;
      previousQuery = "name";
      setTimeout(getNextWikidata,1000);
  	}else{
  	  if (previousQuery == "name"){
	  	   // Look again as an alias
	  	   previousQuery = "alias";
	  	   setTimeout(getNextWikidataAlias,1000);
	  	} else {
		     // Alias not found, try to guess the gender from the first name:
		     if (person != undefined){
		      console.log(person);
		     var gender = guessGender(person);
		     if(gender == "masculin" || gender == "féminin"){
		       $( '.foundName'+nameNb ).each(function(){
		         $(this).append('<td>'+person+'</td><td>'+gender+'</td><td></td>');
		         if(gender == "féminin" || gender == "femme transgenre"){
		            var coordinates = $(this).find(".coord").html();
		            if(!zoomOk){
		               map.setView([coordinates.split(" ")[1],coordinates.split(" ")[0]], 11);
		               zoomOk = true;
		               //console.log("Zoom sur :"+coordinates);
		            }
		            L.marker([coordinates.split(" ")[1],coordinates.split(" ")[0]]).addTo(map).bindPopup($(this).find(".placeName").html()+' :<br>'+person);
		         }
		       });
		        
		     }
		     }
		     // look for the next name on Wikidata
	       nameNb++;
         previousQuery = "name";
         setTimeout(getNextWikidata,1000);	  	
	  	}
  	}
	}
	
	function guessGender(name){
	   var gender = "";
	   var guessedFirstName = "";
	   console.log("Prénom de "+name);
     // Look for female first names:
     var i = 0;
     while(i<femaleFirstNames.length){
       var tryRegexp = name.replace(new RegExp("^"+femaleFirstNames[i]+" ", "ig"), "");
       if(tryRegexp.length < name.length){
         guessedFirstName = femaleFirstNames[i];
         gender = "féminin";
         console.log("féminin !");
         console.log("Prénom deviné : "+guessedFirstName);
       }
       i++;
     }
     // Look for male first names:	   
     var i = 0;
     while(i<maleFirstNames.length){
       var tryRegexp = name.replace(new RegExp("^"+maleFirstNames[i]+" ", "ig"), "");
       if(tryRegexp.length < name.length){
         guessedFirstName = maleFirstNames[i];
         gender = "masculin";
       }
       i++;
     }
     if(gender != ""){
       // Confirm if we indeed found a first name (it should be followed by a whitespace and an uppercase letter or a lowercase d)
       var tryRegexp = name.replace(new RegExp("^"+guessedFirstName+" [A-Zd]", "g"), ""); 
       if(tryRegexp.length == name.length){
         gender = "";
       }
     }
     console.log(gender);
	   return gender;
	}
	
	function normalizeName(name){
     var i = 0;
     while(i<specialNames.length){
       var tryRegexp = name.replace(new RegExp("^"+specialNames[i].substring(3), "ig"), "");
       if(tryRegexp.length < name.length){
         name = tryRegexp;
       }
       i++;
     }
     name = name.replace(/-/gi," ").replace(/ la /gi," La ").replace(/ le /gi," Le ").replace(/ \(.*\)/gi,"");
     //console.log("Nom normalisé à chercher : "+name);
	   return name;
	}


  function getNextWikidataAlias(){
   if(nameNb < foundNames.length){
     var name = foundNames[nameNb];
     //console.log("Alias ?"+nom);
     // Retrieve some information from Wikidata:
     var endpointUrl = 'https://query.wikidata.org/sparql',
   	       sparqlQuery = 'select ?person ?sitelinks ?genderLabel ?personDescription ?personLabel where {\n'+
//'  ?person wdt:P742 "'+nom+'".\n'+
'  {?person rdfs:label "'+normalizeName(name)+'"@fr} UNION {?person skos:altLabel "'+normalizeName(name)+'"@fr} UNION {?person skos:altLabel "'+normalizeName(name)+'"@en}.\n'+
'  ?person wdt:P31 wd:Q5.\n'+
'  ?person wdt:P21 ?gender.\n'+
'  ?person wikibase:sitelinks ?sitelinks.\n'+
'  SERVICE wikibase:label {\n'+
'     bd:serviceParam wikibase:language "fr" .\n'+
'   }\n'+
'} order by desc(?sitelinks)';
     makeSPARQLQuery(endpointUrl, sparqlQuery, wikidataNameResults);
   }
 }


  function getNextWikidata(){
   if(nameNb < foundNames.length){
     var nom = foundNames[nameNb];
     // Retrieve some information from Wikidata:
     var endpointUrl = 'https://query.wikidata.org/sparql',
   	       sparqlQuery = 'select ?person ?sitelinks ?genderLabel ?personDescription ?personLabel where {\n'+
'  {?person rdfs:label "'+nom+'"@fr} UNION {?person skos:altLabel "'+nom+'"@fr} UNION {?person skos:altLabel "'+nom+'"@en}.\n'+
'  ?person wdt:P31 wd:Q5.\n'+
'  ?person wdt:P21 ?gender.\n'+
'  ?person wikibase:sitelinks ?sitelinks.\n'+
'  SERVICE wikibase:label {\n'+
'     bd:serviceParam wikibase:language "fr" .\n'+
'   }\n'+
'} order by desc(?sitelinks)';
         
     makeSPARQLQuery(endpointUrl, sparqlQuery, wikidataNameResults);
   }
 }


  function analyzeBanData(data){
    var csv = Papa.parse(data).data;
    //console.log(csv);  
    var i = 0;
    var insert="";
    if((communes[$("#ville").val()][0]+"").length == 4){
       insert = "0";
    }
    var codeCommune = insert+communes[$("#ville").val()][0];
    for(element in Object.keys(csv)){
      if(i > 0){
        if(csv[i].length>1){
          if(csv[i][3]==codeCommune){
            //console.log(csv[i]);
            addTableRow("voie",csv[i][2],csv[i][4]+" "+csv[i][5],"address");
          }
        }
      }
      i++;
    }
  }
  
  function addTableRow(topic,name,coord,topicCode){
            if(name != ""){
              var coordinates = analyzeCoord(coord);
              var analyzedName = analyzeName(name,topicCode);
              var foundSpecialName = false
              var i = 0;
              while(i<specialNames.length){
                var tryRegexp = analyzedName.replace(new RegExp("^"+specialNames[i], "ig"), "")
                if(tryRegexp.length < analyzedName.length){
                  analyzedName = analyzedName.substring(3) ;
                  foundSpecialName = true;
                }
                i++;
              }
              if(!foundSpecialName){
                if(analyzedName.slice(0,3)=="de "||analyzedName.slice(0,3)=="du "||analyzedName.slice(0,4)=="des "||analyzedName.slice(0,2)=="d'"||analyzedName.slice(0,2)=="d’"){
                  analyzedName = "";
                }
              }
              if(analyzedName != ""){
                var lineNb = foundNames.length;
                if(!(foundNames.includes(analyzedName))){
                  foundNames[lineNb] = analyzedName;
                } else {
                  lineNb = foundNames.indexOf(analyzedName);
                }
                
                $("table").append('<tr class="foundName'+lineNb+'"><td>'+topic+'</td><td class="placeName">'+name+"</td><td>"+analyzedName+'</td><td class="coord">'+coordinates+"</td></tr>");
              } else {
                $("table").append('<tr><td>'+topic+"</td><td>"+name+"</td><td>"+analyzedName+"</td><td>"+coordinates+"</td></tr>");
              }
            }
  }
  
  function analyzeGeoData(data){
    // For each topic, store where to find the following information: name / latitude / longitude
    var findData = {"sports":[3,0,-1],"education":[2,0,-1],"library":[3,0,-1]};
    var csv = Papa.parse(data);
    //console.log(csv)
    var i = 0;
    for(element in Object.keys(csv.data)){
      if(i > 0){
         if(csv.data[i].length>1){
            var name = csv.data[i][findData[themes[themeNumber]][0]];
            var coord = csv.data[i][findData[themes[themeNumber]][1]];
            if(findData[themes[themeNumber]][2] > -1){
              //console.log(findData[themes[themeNumber]][2])
              // if longitude is already included in latitude do nothing
              coord += ","+csvData[findData[themes[themeNumber]][2]];
            }
            addTableRow(themeLabels[themes[themeNumber]],name,coord,themes[themeNumber])
         }
      }
      i++
    }
    themeNumber++;
    if(themeNumber < themes.length){
      setTimeout(sendGeodatamineQuery);
    } else {
      nameNb = 0;
      previousQuery = "name"
      getNextWikidata();
    }
  }
  
  $("#analyse").on("click", function(){
    zoomOk = false;
    var insert="";
    if((communes[$("#ville").val()][0]+"").length==4){
       insert = "0";
    }
    $("#formulaire").hide();
    $("#result-title").html("<h2>Analyse des noms de voies et de lieux à "+$("#ville").val()+"</h2><p>Les lieux nommés d'après des femmes vont s'ajouter progressivement sur la carte ci-dessous...</p><br/>");
    $("#results").append("<p>Code INSEE de la commune : "+insert+communes[$("#ville").val()][0]+"</p>");
    $("#results").append("<p>Code OSM de la commune : "+communes[$("#ville").val()][1]+"</p>");
    $("#results").append('<p><br>Vous voulez nous aider à améliorer les résultats ci-dessous, trouvés automatiquement en interrogeant <a href="https://www.wikidata.org/">Wikidata</a> ?</p><ul><li>Si le nom de personne a bien été détecté dans la troisième colonne, mais qu’il n’a pas été trouvé dans Wikidata, n’hésitez pas à <a target="_blank" href="https://www.wikidata.org/wiki/Help:Aliases/fr#Inclusion">ajouter un <i>alias</i> à la personne concernée sur Wikidata</a> ou bien <a target="_blank" href="https://www.wikidata.org/wiki/Help:Items/fr">contribuer à Wikidata</a> pour créer la page de la personne concernée.</li><li>Sinon, copiez-collez le tableau dans un logiciel de tableur puis remplissez la dernière colonne pour les noms de personnes qui n’ont pas été trouvés dans Wikidata, et transmettez-le à l’adresse philippe.gambette<&alpha;rob&alpha;se>u-pem.fr</li></ul>');
    $("#results").append("<table><tr><th>Type</th><th>Nom du lieu</th><th>Nom de personne potentiel</th><th>Coordonnées</th><th>Nom trouvé sur Wikidata</th><th>Genre</th><th>Nom à trouver sur Wikidata</th></tr></table>")
    
    // Show Leaflet map
    $("#map").show();
    if(map==undefined){
      map = L.map('map').setView([48.8534,2.3488], 5);
      L.tileLayer('//{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
        attribution: 'donn&eacute;es &copy; <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
        minZoom: 1,
        maxZoom: 20
      }).addTo(map);
    }
    $.get("./data/BAN"+(insert+communes[$("#ville").val()][0]).slice(0,2)+".csv")
    .done(analyzeBanData)
    .fail(function( jqxhr, textStatus, error ) {
      var err = textStatus + ", " + error;
      console.log( "Request Failed: " + err );
    });

    
    //
    themes = ["sports","education","library"];
    themeLabels = {"sports":"équipement sportif","education":"lieu d’enseignement","library":"bibliothèque"}
    themeNumber = 0;
    sendGeodatamineQuery();
  });

})