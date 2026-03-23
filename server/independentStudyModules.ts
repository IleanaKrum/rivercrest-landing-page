/**
 * Free Methodist Way Independent Study Modules
 * 12 core doctrinal modules based on FMCUSA "Tunayoyaamini" (What We Believe)
 * Includes both English and Swahili content
 */

import { InsertIndependentStudyModule } from "../drizzle/schema";

export const freeMethodistWayModules: InsertIndependentStudyModule[] = [
  {
    title: "The Holy Trinity",
    description: "Understanding God as Father, Son, and Holy Spirit - one God in three persons",
    category: "trinity",
    language: "English",
    order: 1,
    estimatedHours: 2,
    isPublished: 1,
    content: `
      <h2>The Holy Trinity</h2>
      <p>The Free Methodist Church affirms the doctrine of the Holy Trinity: that there is one God who exists eternally in three persons - God the Father, God the Son (Jesus Christ), and God the Holy Spirit. These three are one in essence, power, and purpose, yet distinct in their roles and relationships.</p>
      
      <h3>God the Father</h3>
      <p>God the Father is the Creator and Sustainer of all things. He is the source of all being and the foundation of all existence. The Father's love for humanity is expressed through creation, providence, and redemption.</p>
      
      <h3>God the Son</h3>
      <p>Jesus Christ, God's only Son, became incarnate to reconcile humanity with God. Through His life, death, and resurrection, Christ accomplished our salvation. He is the mediator between God and humanity, and His sacrifice is the complete and sufficient atonement for sin.</p>
      
      <h3>God the Holy Spirit</h3>
      <p>The Holy Spirit is God's presence and power in the world. The Spirit convicts of sin, regenerates believers, sanctifies the church, and empowers Christians for ministry and witness. The Spirit is the agent of transformation in individual lives and in the church.</p>
      
      <h3>Reflection Questions</h3>
      <ul>
        <li>How does understanding God as Trinity deepen your faith?</li>
        <li>How do you experience the work of each person of the Trinity in your spiritual life?</li>
        <li>How does the Trinity shape the church's understanding of salvation and redemption?</li>
      </ul>
    `,
    contentSwahili: `
      <h2>Utatu Mtakatifu</h2>
      <p>Kanisa la Kifaranga la Kifaranga linakubali mafundisho ya Utatu Mtakatifu: kwamba kuna Mungu mmoja anayeishi milele katika nafsi tatu - Mungu Baba, Mungu Mwana (Yesu Kristo), na Mungu Roho Mtakatifu. Hawa watatu ni mmoja katika asili, nguvu, na kusudi, lakini tofauti katika majukumu na mahusiano yao.</p>
      
      <h3>Mungu Baba</h3>
      <p>Mungu Baba ni Muumba na Mhifadhi wa vitu vyote. Yeye ni chanzo cha kila kitu kilicho hai na msingi wa kila kitu kilichowepo. Upendo wa Baba kwa wanadamu unaonyeshwa kupitia uumbaji, huduma, na ukombozi.</p>
      
      <h3>Mungu Mwana</h3>
      <p>Yesu Kristo, Mwana wa pekee wa Mungu, akakufa mwili ili kupatanisha wanadamu na Mungu. Kupitia maisha Yake, kifo, na ufufuo, Kristo alitimiza wokovu wetu. Yeye ni mpatanishi kati ya Mungu na wanadamu, na dhabihu Yake ni kamili na ya kutosha kwa dhambi zote.</p>
      
      <h3>Mungu Roho Mtakatifu</h3>
      <p>Roho Mtakatifu ni uwepo na nguvu ya Mungu ulimwenguni. Roho hukashifu dhambi, huzaliwa upya waamini, huwatakasa kanisa, na huwaweza Wakristo kwa huduma na ushuhuda. Roho ni wakala wa mabadiliko katika maisha ya kila mtu na katika kanisa.</p>
      
      <h3>Maswali ya Kufikiri</h3>
      <ul>
        <li>Kuelewa Mungu kama Utatu unasadikisha imani yako vipi?</li>
        <li>Unajifunza kazi ya kila nafsi ya Utatu katika maisha yako ya kiroho vipi?</li>
        <li>Utatu unashughulikia uelewa wa kanisa kuhusu wokovu na ukombozi vipi?</li>
      </ul>
    `,
  },
  {
    title: "Scripture Authority",
    description: "The Bible as God's authoritative revelation and the foundation of Christian faith",
    category: "scripture",
    language: "English",
    order: 2,
    estimatedHours: 2,
    isPublished: 1,
    content: `
      <h2>Scripture Authority</h2>
      <p>The Bible is God's written Word, divinely inspired by the Holy Spirit. It provides authoritative testimony to Jesus Christ and serves as the foundation for Christian belief and practice. The Bible teaches truth about God, creation, humanity, salvation, and the Christian life.</p>
      
      <h3>Old Testament</h3>
      <p>The Old Testament records God's covenant with Israel and reveals God's character and purposes throughout history. While ceremonial and civil laws are not binding on Christians today, the moral laws and principles continue to guide ethical living. The Old Testament points forward to Christ and His redemptive work.</p>
      
      <h3>New Testament</h3>
      <p>The New Testament fulfills and interprets the Old Testament. It records God's revelation in Jesus Christ and the work of the Holy Spirit. The New Testament is God's final word concerning humanity, sin, salvation, the world, and its destiny.</p>
      
      <h3>Authority and Interpretation</h3>
      <p>Scripture has authority over all matters of faith and practice. Whatever cannot be found in the Bible or proven by it is not required as an article of faith or necessary for salvation. The Bible is preserved faithfully and demonstrates itself to be true in human experience.</p>
      
      <h3>Reflection Questions</h3>
      <ul>
        <li>How does Scripture shape your understanding of God and faith?</li>
        <li>What role does the Bible play in your personal spiritual journey?</li>
        <li>How do you approach interpreting Scripture in your daily life?</li>
      </ul>
    `,
    contentSwahili: `
      <h2>Mamlaka ya Maandiko</h2>
      <p>Biblia ni Neno la Mungu lililoandikwa, lililoongozwa na Roho Mtakatifu. Inatoa ushuhuda usio na kifani kwa Yesu Kristo na inashughulikia msingi wa imani na mazoea ya Kikristo. Biblia hufundisha ukweli kuhusu Mungu, uumbaji, wanadamu, wokovu, na maisha ya Kikristo.</p>
      
      <h3>Agano la Kale</h3>
      <p>Agano la Kale linarekodia agano la Mungu na Israeli na linafichua sifa na kusudi la Mungu katika historia. Ingawa sheria za sherehe na za kiraia hazina lazima kwa Wakristo leo, sheria za maadili na kanuni zinaendelea kuongoza maisha ya maadili. Agano la Kale linaonyesha mbele kwa Kristo na kazi Yake ya ukombozi.</p>
      
      <h3>Agano Jipya</h3>
      <p>Agano Jipya linatimiza na kutafsiri Agano la Kale. Linarekodia ufunuo wa Mungu katika Yesu Kristo na kazi ya Roho Mtakatifu. Agano Jipya ni neno la mwisho la Mungu kuhusu wanadamu, dhambi, wokovu, ulimwengu, na hatima yake.</p>
      
      <h3>Mamlaka na Tafsiri</h3>
      <p>Maandiko yana mamlaka juu ya maswala yote ya imani na mazoea. Chochote ambacho hakipatikani katika Biblia wala hakiwezi kuthibitishwa nayo, hakihitajiki kama makala ya imani au kama cha lazima kwa wokovu. Biblia imehifadhiwa kwa uaminifu na inajidhihirisha kuwa kweli katika uzoefu wa wanadamu.</p>
      
      <h3>Maswali ya Kufikiri</h3>
      <ul>
        <li>Maandiko yanashughulikia uelewa wako wa Mungu na imani vipi?</li>
        <li>Jukumu gani linacheza Biblia katika safari yako ya kiroho?</li>
        <li>Unakaribia tafsiri ya Maandiko katika maisha yako ya kila siku vipi?</li>
      </ul>
    `,
  },
  {
    title: "Humanity and Moral Freedom",
    description: "Understanding human nature, moral responsibility, and the effects of sin",
    category: "humanity",
    language: "English",
    order: 3,
    estimatedHours: 2,
    isPublished: 1,
    content: `
      <h2>Humanity and Moral Freedom</h2>
      <p>God created humanity in His image as moral and responsible beings with the freedom to choose between good and evil. This freedom is essential to genuine moral responsibility and authentic relationship with God.</p>
      
      <h3>Created in God's Image</h3>
      <p>All people are created in God's image and possess inherent dignity and worth. This means all humans have equal value regardless of gender, nationality, or race. Each person is accountable to God for their choices and actions.</p>
      
      <h3>The Effects of Sin</h3>
      <p>Through Adam's sin, humanity became corrupted in nature. All people are inclined toward sin from birth and cannot, by their own power, restore themselves to right relationship with God or achieve salvation. Sin separates us from God and brings judgment.</p>
      
      <h3>Moral Responsibility</h3>
      <p>Despite human sinfulness, God has given all people the resources of the Trinity to accept His grace through faith in Jesus Christ as Savior and Lord. Through God's grace and enabling power, people are empowered to do good works according to moral principles.</p>
      
      <h3>Reflection Questions</h3>
      <ul>
        <li>What does it mean to be created in God's image?</li>
        <li>How does understanding human sinfulness affect your faith?</li>
        <li>How do you exercise moral freedom in your daily decisions?</li>
      </ul>
    `,
    contentSwahili: `
      <h2>Watu wanye Uhuru kwa Maadili</h2>
      <p>Mungu aliumba wanadamu kwa mfano wake mwenyewe kama watu wenye maadili na wajibu na uhuru wa kuchagua kati ya mema na mabaya. Uhuru huu ni muhimu kwa wajibu wa kweli wa maadili na uhusiano wa kweli na Mungu.</p>
      
      <h3>Kuumbwa kwa Mfano wa Mungu</h3>
      <p>Watu wote wameuimbwa kwa mfano wa Mungu na wana hadhi na thamani ya asili. Hii inamaanisha watu wote wana thamani sawa bila kujali jinsia, taifa, au rangi. Kila mtu ana wajibu kwa Mungu kwa ajili ya chaguo na matendo yao.</p>
      
      <h3>Matokeo ya Dhambi</h3>
      <p>Kupitia dhambi ya Adamu, wanadamu wakabadilika katika asili yao. Watu wote wanakumbwa kuelekea dhambi tangu kuzaliwa na hawaezi, kwa nguvu zao wenyewe, kurejeza wenyewe katika uhusiano sahihi na Mungu au kufikia wokovu. Dhambi inatusambaza na Mungu na inaleta hukumu.</p>
      
      <h3>Wajibu wa Maadili</h3>
      <p>Ingawa wanadamu ni wenye dhambi, Mungu amewapa watu wote rasilimali zote za Utatu ili kukubali neema Yake kupitia imani katika Yesu Kristo kama Mwokozi na Bwana. Kupitia neema ya Mungu na kuwasaidia, watu wanawezeshwa kufanya matendo mema kulingana na kanuni za maadili.</p>
      
      <h3>Maswali ya Kufikiri</h3>
      <ul>
        <li>Kuumbwa kwa mfano wa Mungu kunamaanisha nini?</li>
        <li>Kuelewa dhambi ya wanadamu kunathiri imani yako vipi?</li>
        <li>Unajumuisha uhuru wa maadili katika maamuzi yako ya kila siku vipi?</li>
      </ul>
    `,
  },
  {
    title: "The Law of Life and Love",
    description: "The two great commandments and their application to personal and social life",
    category: "law_and_love",
    language: "English",
    order: 4,
    estimatedHours: 2,
    isPublished: 1,
    content: `
      <h2>The Law of Life and Love</h2>
      <p>God's law for all human life, both personal and social, is expressed in two great commandments: Love the Lord your God with all your heart, soul, mind, and strength, and love your neighbor as yourself. These commandments reveal what is best for people in their relationships with God, one another, and their families.</p>
      
      <h3>Love for God</h3>
      <p>The first commandment calls us to complete devotion to God. This means recognizing God as the only God with power, submitting ourselves fully to His will, and ordering our lives according to His purposes. Our love for God is demonstrated through obedience and worship.</p>
      
      <h3>Love for Neighbor</h3>
      <p>The second commandment calls us to love others as we love ourselves. This includes respecting human dignity, honoring rights, and promoting the well-being of all people. It calls us to justice, compassion, and service to others.</p>
      
      <h3>Personal and Social Responsibility</h3>
      <p>These commandments apply to both personal conduct and social responsibility. Christians are called to live ethically in their personal lives and to work for justice and righteousness in society. All people, created in God's image, deserve respect and care.</p>
      
      <h3>Reflection Questions</h3>
      <ul>
        <li>How do the two great commandments shape your relationship with God?</li>
        <li>How do you express love for your neighbor in practical ways?</li>
        <li>What does it mean to pursue justice and righteousness in your community?</li>
      </ul>
    `,
    contentSwahili: `
      <h2>Sheria ya Maisha na Upendo</h2>
      <p>Sheria ya Mungu kwa maisha yote ya binadamu, ya kibinafsi na ya kijamii, inaonyeshwa katika amri mbili za Mungu: Mpende Bwana Mungu kwa moyo wako wote, akili, na nguvu, na mpende jirani yako kama wewe mwenyewe. Amri hizi zinafunua kile kilicho bora kwa watu katika uhusiano wao na Mungu, wengine, na jamii.</p>
      
      <h3>Upendo kwa Mungu</h3>
      <p>Amri ya kwanza inaita kwa upendo kamili kwa Mungu. Hii inamaanisha kutambua Mungu kama Mungu pekee wenye nguvu, kumkubali kwa nguvu zote, na kuandaa maisha yetu kulingana na kusudi lake. Upendo wetu kwa Mungu unaonyeshwa kupitia utii na ibada.</p>
      
      <h3>Upendo kwa Jirani</h3>
      <p>Amri ya pili inaita kwa upendo kwa wengine kama tunavyojipenda. Hii inajumuisha kuheshimu hadhi ya binadamu, kuheshimu haki, na kuchangia furaha ya watu wote. Inaita kwa haki, huruma, na huduma kwa wengine.</p>
      
      <h3>Wajibu wa Kibinafsi na Kijamii</h3>
      <p>Amri hizi zinatumika kwa mazoea ya kibinafsi na wajibu wa kijamii. Wakristo wanaitwa kuishi kwa maadili katika maisha yao ya kibinafsi na kufanya kazi kwa haki na haki katika jamii. Watu wote, waliouimbwa kwa mfano wa Mungu, wanastahili heshima na huduma.</p>
      
      <h3>Maswali ya Kufikiri</h3>
      <ul>
        <li>Amri mbili za Mungu zinashughulikia uhusiano wako na Mungu vipi?</li>
        <li>Unajumuisha upendo kwa jirani katika njia za vitendo vipi?</li>
        <li>Kufanya kazi kwa haki na haki katika jamii kunamaanisha nini?</li>
      </ul>
    `,
  },
  {
    title: "Good Works",
    description: "Understanding the relationship between faith and works in the Christian life",
    category: "good_works",
    language: "English",
    order: 5,
    estimatedHours: 1,
    isPublished: 1,
    content: `
      <h2>Good Works</h2>
      <p>Good works are the fruit of faith in Jesus Christ, yet works cannot save us from sin or God's judgment. As evidence of Christian faith and love, our good works done with humility and reverence are acceptable to God and please Him. However, good works cannot earn God's grace.</p>
      
      <h3>Works as Fruit of Faith</h3>
      <p>Good works naturally flow from genuine faith in Christ. They demonstrate the reality of our conversion and our commitment to following Christ. Works are the outward expression of inner transformation by the Holy Spirit.</p>
      
      <h3>Works Cannot Save</h3>
      <p>While good works are important, they are not the basis of salvation. Salvation comes through faith in Christ alone. No amount of good works can earn God's favor or forgiveness of sins. Grace is God's free gift to those who believe.</p>
      
      <h3>Living Out Our Faith</h3>
      <p>Christians are called to live lives of service and good works as an expression of gratitude for God's grace. Through good works, we demonstrate Christ's love to the world and participate in God's redemptive purposes.</p>
      
      <h3>Reflection Questions</h3>
      <ul>
        <li>How do your good works reflect your faith in Christ?</li>
        <li>What is the relationship between grace and works in your spiritual life?</li>
        <li>How can you serve others as an expression of your faith?</li>
      </ul>
    `,
    contentSwahili: `
      <h2>Matendo Mema</h2>
      <p>Matendo mema ni tunda la imani katika Yesu Kristo, lakini matendo hayawezi kutuokoa kutoka dhambi au hukumu ya Mungu. Kama maonyesho ya imani ya Kikristo na upendo, matendo yetu mema yaliyofanywa kwa heshima na unyenyekevu yanakubalika na yanampendeza Mungu. Lakini matendo mema hayawezi kupatia neema ya Mungu.</p>
      
      <h3>Matendo kama Tunda la Imani</h3>
      <p>Matendo mema yanayotoka kwa asili kutoka imani ya kweli katika Kristo. Yanaonyesha ukweli wa ubadilisho wetu na kujitolea kwetu kufuata Kristo. Matendo ni maonyesho ya nje ya ubadilisho wa ndani na Roho Mtakatifu.</p>
      
      <h3>Matendo Hayawezi Kuokoa</h3>
      <p>Ingawa matendo mema ni muhimu, hayajitokezi msingi wa wokovu. Wokovu unakuja kupitia imani katika Kristo pekee. Hakuna matendo mema yanayoweza kupatia neema ya Mungu au msamaha wa dhambi. Neema ni zawadi ya bure ya Mungu kwa wale wanaoamini.</p>
      
      <h3>Kuishi Imani Yetu</h3>
      <p>Wakristo wanaitwa kuishi maisha ya huduma na matendo mema kama maonyesho ya shukrani kwa neema ya Mungu. Kupitia matendo mema, tunaonyesha upendo wa Kristo kwa ulimwengu na tunashiriki katika kusudi la ukombozi la Mungu.</p>
      
      <h3>Maswali ya Kufikiri</h3>
      <ul>
        <li>Matendo yako mema yanaonyesha imani yako katika Kristo vipi?</li>
        <li>Uhusiano gani kati ya neema na matendo katika maisha yako ya kiroho?</li>
        <li>Unaweza kumtumikia wengine kama maonyesho ya imani yako vipi?</li>
      </ul>
    `,
  },
  {
    title: "Christ's Sacrifice",
    description: "The complete and sufficient atonement through Christ's death and resurrection",
    category: "christ_sacrifice",
    language: "English",
    order: 6,
    estimatedHours: 2,
    isPublished: 1,
    content: `
      <h2>Christ's Sacrifice</h2>
      <p>Christ offered one complete and perfect sacrifice for the sins of the whole world. There is no need for any other atonement for sin; no one else can accomplish that redemption. Christ's death and resurrection are the foundation of Christian salvation.</p>
      
      <h3>The Sufficiency of Christ's Sacrifice</h3>
      <p>Jesus Christ, God's Son, shed His blood as an innocent sacrifice for our sins. His death fully satisfies God's justice and provides complete forgiveness for all who believe. There is no sin too great for Christ's sacrifice to cover.</p>
      
      <h3>The Meaning of the Cross</h3>
      <p>The cross represents God's love for humanity and His willingness to bear the penalty for our sins. Through Christ's sacrifice, we are reconciled to God, freed from guilt and shame, and restored to right relationship with our Creator.</p>
      
      <h3>Living in Light of the Sacrifice</h3>
      <p>Understanding Christ's sacrifice calls us to gratitude, humility, and commitment. We are called to live in response to this great act of love, dedicating ourselves to following Christ and serving others.</p>
      
      <h3>Reflection Questions</h3>
      <ul>
        <li>What does Christ's sacrifice mean for your personal salvation?</li>
        <li>How does understanding the cross deepen your faith?</li>
        <li>How should Christ's sacrifice affect the way you live?</li>
      </ul>
    `,
    contentSwahili: `
      <h2>Dhabihu ya Kristo</h2>
      <p>Kristo alitoa dhabihu moja kamilifu kwa ajili ya dhambi za ulimwengu wote. Hakuna haja ya fidia nyingine kwa dhambi; hakuna mwingine anayeweza kutimiza ukombozi huo. Kifo na ufufuo wa Kristo ni msingi wa wokovu wa Kikristo.</p>
      
      <h3>Kutosha kwa Dhabihu ya Kristo</h3>
      <p>Yesu Kristo, Mwana wa Mungu, alimwaga damu Yake kama dhabihu isiyosifu kwa ajili ya dhambi zetu. Kifo Chake kinakidhi haki ya Mungu kabisa na kinatoa msamaha kamili kwa wote wanaoamini. Hakuna dhambi kubwa sana kwa dhabihu ya Kristo isichofunika.</p>
      
      <h3>Maana ya Msalaba</h3>
      <p>Msalaba unawakilisha upendo wa Mungu kwa wanadamu na hali yake ya kufa kwa ajili ya dhambi zetu. Kupitia dhabihu ya Kristo, tunapatanishwa na Mungu, tunaachiliwa kutoka hatia na aibu, na tunarejeshwa katika uhusiano sahihi na Muumba wetu.</p>
      
      <h3>Kuishi katika Mwanga wa Dhabihu</h3>
      <p>Kuelewa dhabihu ya Kristo inaita kwa shukrani, unyenyekevu, na kujitolea. Tunaita kuishi katika jibu la kazi hii kubwa ya upendo, kujitolea kufuata Kristo na kumtumikia wengine.</p>
      
      <h3>Maswali ya Kufikiri</h3>
      <ul>
        <li>Dhabihu ya Kristo inamaanisha nini kwa wokovu wako wa kibinafsi?</li>
        <li>Kuelewa msalaba kunasadikisha imani yako vipi?</li>
        <li>Dhabihu ya Kristo inapaswa kuathiri jinsi unavyoishi vipi?</li>
      </ul>
    `,
  },
];

// Continue with remaining 6 modules...
export const freeMethodistWayModulesPart2: InsertIndependentStudyModule[] = [
  {
    title: "New Life in Christ",
    description: "Justification, regeneration, and adoption - the beginning of the Christian life",
    category: "new_life",
    language: "English",
    order: 7,
    estimatedHours: 3,
    isPublished: 1,
    content: `
      <h2>New Life in Christ</h2>
      <p>New life and right relationship with God are possible through God's redemptive work in Jesus Christ. When people repent and believe in Jesus as Savior and Lord, God through the Holy Spirit brings about new life and reconciles them with His grace.</p>
      
      <h3>Justification</h3>
      <p>Justification is a legal term emphasizing that through our new relationship in Jesus Christ, people are truly counted as righteous, freed from guilt and the penalty of sin. We are declared just before God through faith in Christ.</p>
      
      <h3>Regeneration (Born Again)</h3>
      <p>Regeneration is a biological term showing that through our new relationship in Christ, a person truly has new life and a new spiritual nature with the power of faith, love, and obedience to Christ as Lord. The believer is born again and is a new creation.</p>
      
      <h3>Adoption</h3>
      <p>Adoption is a family term expressing encouragement, love, and acceptance. Through our new relationship in Christ, believers have become God's children, set free from slavery to sin and Satan. Believers have the witness of the Spirit that they are God's children.</p>
      
      <h3>Reflection Questions</h3>
      <ul>
        <li>What does it mean to be born again in Christ?</li>
        <li>How has becoming a child of God changed your life?</li>
        <li>How do justification and regeneration work together in your salvation?</li>
      </ul>
    `,
    contentSwahili: `
      <h2>Maisha Mapya katika Kristo</h2>
      <p>Maisha mapya na uhusiano sahihi na Mungu yanawezekana kupitia matendo ya ukombozi ya Mungu katika Yesu Kristo. Wakati watu wanatuba na kuamini Yesu kama Mwokozi na Bwana, Mungu kupitia Roho Wake hufanya kazi ya kutoa maisha mapya na kuwaweka watu katika uhusiano na Yeye mwenyewe.</p>
      
      <h3>Kuhesabiwa Haki</h3>
      <p>Kuhesabiwa haki ni neno la kisheria linasisitiza kwamba kwa uhusiano mpya katika Yesu Kristo watu kwa kweli wanahesabiwa kuwa wenye haki, kuwa huru kutoka hatia na adhabu ya dhambi zao. Tunahesabiwa kuwa wenye haki mbele ya Mungu kupitia imani katika Kristo.</p>
      
      <h3>Kuzaliwa Upya</h3>
      <p>Kuzaliwa upya ni neno la kibiolojia linayoonyesha kwamba kwa uhusiano mpya katika Kristo, mtu kwa kweli ana maisha mapya na asili mpya ya kiroho yenye uwezo wa imani, upendo na utii kwa Kristo Yesu kama Bwana. Muumini huzaliwa mara ya pili na ni kiumbe kipya.</p>
      
      <h3>Kuasilishwa kuwa Wana</h3>
      <p>Kuasilishwa kuwa wana ni neno la kifamilia lenye kutia moyo, upendo, na kukubalika. Kupitia uhusiano mpya katika Kristo, waamini wamekuwa watoto Wake waliowekwa huru kutoka utumwa wa dhambi na Shetani. Waamini wana ushuhuda wa Roho kwamba wao ni watoto wa Mungu.</p>
      
      <h3>Maswali ya Kufikiri</h3>
      <ul>
        <li>Kuzaliwa upya katika Kristo kunamaanisha nini?</li>
        <li>Kuwa mtoto wa Mungu kumebadilisha maisha yako vipi?</li>
        <li>Kuhesabiwa haki na kuzaliwa upya vinafanya kazi pamoja katika wokovu wako vipi?</li>
      </ul>
    `,
  },
  {
    title: "Sanctification",
    description: "God's work of making believers holy and transforming them into Christ's likeness",
    category: "sanctification",
    language: "English",
    order: 8,
    estimatedHours: 3,
    isPublished: 1,
    content: `
      <h2>Sanctification</h2>
      <p>Sanctification is God's work of making believers holy. It begins after new life in Christ when the Holy Spirit makes people like God, changing them through trials and process from one degree of glory to another, conforming them to Christ's image.</p>
      
      <h3>The Process of Sanctification</h3>
      <p>Sanctification is both instantaneous and progressive. At conversion, believers are set apart for God's purposes. Throughout the Christian life, the Holy Spirit continues the work of transformation, gradually conforming believers to Christ's character.</p>
      
      <h3>Entire Sanctification</h3>
      <p>As believers surrender to God in faith and die to self through complete dedication, the Holy Spirit fills them with love and cleanses them from sin. This relationship of sanctification with God heals the divided mind, directs the heart toward God, and empowers believers to please and serve God in their daily lives.</p>
      
      <h3>Living in Holiness</h3>
      <p>Thus God sets believers free to love Him with all their heart, soul, mind, and strength, and to love their neighbor as themselves. Sanctification is not perfection but a growing conformity to Christ and increasing obedience to God's will.</p>
      
      <h3>Reflection Questions</h3>
      <ul>
        <li>What does it mean to be sanctified or made holy?</li>
        <li>How is the Holy Spirit working to transform you into Christ's likeness?</li>
        <li>What areas of your life need greater sanctification and transformation?</li>
      </ul>
    `,
    contentSwahili: `
      <h2>Utakaso</h2>
      <p>Utakaso ni kazi ya Mungu ya kuokoa huanzia baada ya kuanza maisha mapya katika Kristo ambapo Roho Mtakatifu huwafanya watu wake kwa mfano wa Mungu, akiwabadilisha kupitia shida na mchakato, kutoka kiwango kimoja cha utukufu hadi kingine, na kuwalinganisha na mfano wa Kristo.</p>
      
      <h3>Mchakato wa Utakaso</h3>
      <p>Utakaso ni haraka na hatua kwa hatua. Wakati wa uonyo, waamini wanawekwa kando kwa kusudi la Mungu. Katika maisha ya Kikristo, Roho Mtakatifu anaendelea kufanya kazi ya ubadilisho, akiwabadilisha waamini kwa hatua kwa hatua kuwa na sifa ya Kristo.</p>
      
      <h3>Utakaso Kamili</h3>
      <p>Kama waamini wanavyojisalimisha kwa Mungu kwa imani na kufa kwa nafsi kupitia wakfu kamili, Roho Mtakatifu huwajaza upendo na kuwatakasa kutoka dhambi. Uhusiano huu wa utakaso na Mungu hutibu akili iliyogawanyika, huelekeza moyo kwa Mungu, na kuwawezesha waamini kumpendeza na kumtumikia Mungu katika maisha yao ya kila siku.</p>
      
      <h3>Kuishi katika Utakatifu</h3>
      <p>Hivyo ndivyo, Mungu anavyowaweka watu wake huru kumpenda kwa moyo wao wote, roho, akili, na nguvu, na kumpenda jirani yao kama wao wenyewe. Utakaso si ukamilifu lakini ukuaji wa kulinganisha na Kristo na kuongezeka kwa utii kwa kusudi la Mungu.</p>
      
      <h3>Maswali ya Kufikiri</h3>
      <ul>
        <li>Kuwa mtakatifu au kutengenezwa kuwa takatifu kunamaanisha nini?</li>
        <li>Roho Mtakatifu anakufanya kazi ya kubadilisha kuwa na mfano wa Kristo vipi?</li>
        <li>Sehemu zipi za maisha yako zinahitaji utakaso na ubadilisho zaidi?</li>
      </ul>
    `,
  },
  {
    title: "Restoration",
    description: "Backsliding, repentance, and God's grace for those who stray",
    category: "restoration",
    language: "English",
    order: 9,
    estimatedHours: 2,
    isPublished: 1,
    content: `
      <h2>Restoration</h2>
      <p>Christians can be strengthened in their growing relationship with Jesus as Lord and Savior. However, they can grieve the Holy Spirit in relationships of daily life without returning to the dominion of sin. When they do, they must humbly accept the Holy Spirit's correction, believe in Jesus' intercession, and restore their relationship.</p>
      
      <h3>Backsliding</h3>
      <p>Backsliding occurs when believers turn away from their commitment to Christ and engage in sin. This breaks fellowship with God but does not necessarily mean loss of salvation. Backsliding is a serious matter that requires repentance and restoration.</p>
      
      <h3>Repentance and Forgiveness</h3>
      <p>God offers repentance before God for those who have sinned intentionally and can cut off their relationship with Christ. However, through genuine repentance, forgiveness is given and the relationship with Christ is restored because not every sin is against the Holy Spirit and cannot be forgiven. God's grace is sufficient for those who truly repent and, through His enabling power, correct their lives.</p>
      
      <h3>The Church's Role in Restoration</h3>
      <p>God has given the church responsibility and power to restore believers who have repented through caring rebuke, counsel, and acceptance. The church is called to minister restoration with love, humility, and the goal of reconciliation.</p>
      
      <h3>Reflection Questions</h3>
      <ul>
        <li>What does it mean to experience backsliding in your faith?</li>
        <li>How does God's grace extend to those who repent?</li>
        <li>How can the church help restore those who have strayed?</li>
      </ul>
    `,
    contentSwahili: `
      <h2>Urejesho</h2>
      <p>Wakristo wanaweza kuimarishwa katika uhusiano unaokua na Yesu kama Bwana na Mwokozi. Hata hivyo, wanaweza kumhuzunisha Roho Mtakatifu katika mahusiano ya maisha bila kurudi kwenye utawala wa dhambi. Wanapofanya hivyo, lazima wakubali kwa unyenyekevu marekebisho ya Roho Mtakatifu, waamini katika utetezi wa Yesu, na kurekebisha uhusiano wao.</p>
      
      <h3>Kugeuka Nyuma</h3>
      <p>Kugeuka nyuma kunatokea wakati waamini wanatoka kwa kujitolea kwao kwa Kristo na kuendelea katika dhambi. Hii inakatiza jamii na Mungu lakini si lazima inamaanisha kupoteza wokovu. Kugeuka nyuma ni jambo kubwa linaloitaji tuba na urejesho.</p>
      
      <h3>Tuba na Msamaha</h3>
      <p>Mungu anatoa tuba mbele za Mungu kwa wale wanaosifu kwa makusudi na kukata uhusiano wao na Kristo. Hata hivyo kwa toba mbele za Mungu, msamaha hutolewa na uhusiano na Kristo hurejeshwa, kwa kuwa si kila dhambi ni dhambi dhidi ya Roho Mtakatifu na haiwezi kusamehewa. Neema ya Mungu ni ya kutosha kwa wale wanaotubu kwa kweli na, kwa kuwezesha kwake, kurekebisha maisha yao.</p>
      
      <h3>Jukumu la Kanisa katika Urejesho</h3>
      <p>Mungu ametoa jukumu na nguvu kwa kanisa kurejesha waamini wenye toba kupitia karipio la upendo, ushauri na kumpokea. Kanisa linaitwa kumtumikia urejesho kwa upendo, unyenyekevu, na lengo la patanisho.</p>
      
      <h3>Maswali ya Kufikiri</h3>
      <ul>
        <li>Kugeuka nyuma katika imani yako kunamaanisha nini?</li>
        <li>Neema ya Mungu inaenea vipi kwa wale wanaotubu?</li>
        <li>Kanisa linaweza kusaidia kurejeza wale waliokosa vipi?</li>
      </ul>
    `,
  },
  {
    title: "The Church",
    description: "The nature, purpose, and mission of the body of Christ",
    category: "church",
    language: "English",
    order: 10,
    estimatedHours: 2,
    isPublished: 1,
    content: `
      <h2>The Church</h2>
      <p>The church is created by God. It is God's people. Jesus Christ is the Lord and head of the church. The Holy Spirit is its life and power. The church is both divine and human, heavenly and earthly, ideal and imperfect. It is a living organism, not a static institution. It exists to fulfill God's purposes in Christ. It is a ministry to people.</p>
      
      <h3>The Nature of the Church</h3>
      <p>The church is the body of Christ, composed of believers who have been redeemed and saved. It is a fellowship of the Holy Spirit, united by faith in Christ and commitment to His kingdom. The church transcends all human boundaries of nationality, race, gender, and social status.</p>
      
      <h3>The Purpose of the Church</h3>
      <p>Christ loved the church and gave Himself for it so that it should be holy and without blemish. The church exists to worship God, proclaim the gospel, nurture believers in faith, and serve humanity. The church is called to be a witness to Christ's redemptive love in the world.</p>
      
      <h3>The Mission of the Church</h3>
      <p>The Free Methodist Church seeks to be a representative of what the church of Jesus Christ should be on earth. Therefore, it requires special commitment concerning the faith and life of its members. In its needs, it wants to honor Christ and obey God's written Word.</p>
      
      <h3>Reflection Questions</h3>
      <ul>
        <li>What does it mean to be part of the body of Christ?</li>
        <li>How does the church fulfill God's purposes in the world?</li>
        <li>What is your role in the church's mission?</li>
      </ul>
    `,
    contentSwahili: `
      <h2>Kanisa</h2>
      <p>Kanisa limeumbwa na Mungu. Ni watu wa Mungu. Kristo Yesu ni Bwana na kichwa chake. Roho Mtakatifu ni uzima na nguvu zake. Ni la kimungu na la kibinadamu, la mbinguni na la kidunia, bora na isiyo kamili. Ni kiumbe, sio taasisi isiyobadilika. Lipo ili kutimiza malengo ya Mungu katika Kristo. Ni huduma kwa watu.</p>
      
      <h3>Asili ya Kanisa</h3>
      <p>Kanisa ni mwili wa Kristo, linajumuisha waamini waliokombollewa na kuokoka. Ni jamii ya Roho Mtakatifu, iliyounganishwa na imani katika Kristo na kujitolea kwa ufalme Wake. Kanisa linatoka nje ya mipaka yote ya binadamu ya taifa, rangi, jinsia, na hali ya kijamii.</p>
      
      <h3>Kusudi la Kanisa</h3>
      <p>Kristo alipenda kanisa na kujitoa mwenyewe kwa ajili yake kwamba linapaswa kuwa takatifu na lisilo na hatia. Kanisa lipo ili kuabudu Mungu, kuhubiri injili, kulea waamini katika imani, na kumtumikia wanadamu. Kanisa linaitwa kuwa ushuhuda wa upendo wa ukombozi wa Kristo ulimwenguni.</p>
      
      <h3>Misioni ya Kanisa</h3>
      <p>Kanisa Huru la Methodisti linakusudia kuwa mwakilishi wa kile kanisa la Yesu Kristo linapaswa kuwa kwenye ardhi. Kwa hivyo inahitajika kujitolea maalum kuhusu imani na maisha ya washiriki wake. Katika mahitaji yake linataka kumheshimu Kristo na kutii Neno la Mungu lililoandikwa.</p>
      
      <h3>Maswali ya Kufikiri</h3>
      <ul>
        <li>Kuwa sehemu ya mwili wa Kristo kunamaanisha nini?</li>
        <li>Kanisa linakamilisha kusudi la Mungu ulimwenguni vipi?</li>
        <li>Jukumu lako katika misioni ya kanisa ni nini?</li>
      </ul>
    `,
  },
  {
    title: "Worship and Sacraments",
    description: "The practice of worship in understandable language and the two sacraments: Baptism and Communion",
    category: "sacraments",
    language: "English",
    order: 11,
    estimatedHours: 2,
    isPublished: 1,
    content: `
      <h2>Worship and Sacraments</h2>
      <p>According to God's Word and the practice of the early church, public worship, prayer, and administration of the sacraments must be in a language understood by the people. The two sacraments of the church, ordained by Christ, are Baptism and the Lord's Supper.</p>
      
      <h3>Baptism</h3>
      <p>Water baptism is a sacrament of the church, ordained by our Lord, showing that we have received the benefits of Jesus Christ's atonement. It is given to believers as a declaration of their faith in Jesus Christ as Savior. Baptism is a sign of the new covenant of grace, as circumcision was a sign of the old covenant. Because infants are recognized as included in the atonement, they may be baptized at the request of parents or guardians who will give them assurance of Christian teaching. They will be required to confirm their vows themselves before being accepted as members of the church.</p>
      
      <h3>The Lord's Supper</h3>
      <p>The Lord's Supper is a sacrament of Christ's redemption through His death. For those who rightly, worthily, and in faith receive it, the broken bread is a sharing in Christ's body, and likewise the cup of blessing is a sharing in Christ's blood. The evening meal is also a sign of the love and unity that Christians have with one another.</p>
      
      <h3>The Meaning of the Sacraments</h3>
      <p>Christ, according to His promise, is truly present in the sacrament. But His body is offered, taken, and eaten as a memorial of things in heaven and spiritually only. There is no change in the elements; bread and wine are not Christ's body and blood. Neither Christ's body and blood are truly in these vessels. They are never to be taken as things to be worshipped. Christ's body is received and eaten by faith.</p>
      
      <h3>Reflection Questions</h3>
      <ul>
        <li>What does baptism signify in your faith journey?</li>
        <li>How does participating in the Lord's Supper deepen your faith?</li>
        <li>What role do the sacraments play in the church's worship?</li>
      </ul>
    `,
    contentSwahili: `
      <h2>Ibada na Sakramenti Takatifu</h2>
      <p>Kulingana na Neno la Mungu na desturi ya kanisa la kwanza, ibada ya umma na maombi na usimamizi wa sakramenti lazima iwe katika lugha inayoeleweka na watu. Sakramenti mbili za kanisa, zilizoamriwa na Kristo, ni Ubatizo na Meza ya Bwana.</p>
      
      <h3>Ubatizo</h3>
      <p>Ubatizo wa maji ni sakramenti ya kanisa, iliyoamriwa na Bwana wetu, kuonyesha kwamba tumepokea faida za upatanisho wa Yesu Kristo, hutolewa kwa waumini kama tangazo la imani yao katika Yesu Kristo kama Mwokozi. Ubatizo ni ishara ya agano jipya la neema kama tohara ilivyokuwa ishara ya agano la kale; na, kwa kuwa watoto wachanga wanatambuliwa kuwa wamejumuishwa katika upatanisho, wanaweza kubatizwa kwa ombi la wazazi au walezi ambao watawapa uhakikisho wa mafunzo muhimu ya Kikristo. Watatakiwa kuthibitisha nadhiri yao wenyewe kabla ya kukubaliwa kuwa washiriki wa kanisa.</p>
      
      <h3>Meza ya Bwana</h3>
      <p>Meza ya Bwana ni sakramenti ya ukombozi wetu kwa kifo cha Kristo. Kwa wale ambao kwa haki, kwa ustahiki na kwa imani wanaupokea, mkate tunaouvunja ni kushiriki mwili wa Kristo; na vivyo hivyo kikombe cha baraka ni kushiriki damu ya Kristo. Chakula cha jioni pia ni ishara ya upendo na umoja ambao Wakristo wanayo kati yao.</p>
      
      <h3>Maana ya Sakramenti</h3>
      <p>Kristo, kulingana na ahadi yake, kwa kweli yupo katika sakramenti. Lakini mwili wake hutolewa, kuchukuliwa na kuliwa kama ukumbusho wa mambo ya mbinguni nay a kiroho tu. Hakuna mabadiliko yanayofanyika katika kipengele; mkate na divai sio mwili na damu ya Kristo. Wala mwili na damu ya Kristo havipo kwa kweli katika hivyo vyombo. kamwe havipaswi kuchukuliwa kuwa vitu vya kuabudiwa. Mwili wa Kristo unapokelewa na kuliwa kwa imani.</p>
      
      <h3>Maswali ya Kufikiri</h3>
      <ul>
        <li>Ubatizo unasadikisha nini katika safari yako ya imani?</li>
        <li>Kushiriki katika Meza ya Bwana kunasadikisha imani yako vipi?</li>
        <li>Jukumu gani linacheza sakramenti katika ibada ya kanisa?</li>
      </ul>
    `,
  },
];
