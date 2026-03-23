/**
 * Bilingual Quiz Questions for FMC Videos
 * Each quiz has 5 questions in English and Swahili
 */

export const fmcQuizzes = [
  {
    videoId: 1,
    title: "FMC Origins: Our Heritage",
    titleSwahili: "Asili za FMC: Urithi Wetu",
    description: "Test your knowledge about the origins of the Free Methodist Church and John Wesley's legacy.",
    descriptionSwahili: "Jaribu maarifa yako kuhusu asili ya Kanisa la Methodist Huru na urithi wa John Wesley.",
    passingScore: 70,
    questions: [
      {
        questionText: "Who founded the Methodist movement?",
        questionTextSwahili: "Nani aliyasasa harakati ya Methodist?",
        answers: [
          { text: "John Wesley", textSwahili: "John Wesley", isCorrect: true, explanation: "John Wesley founded the Methodist movement in 1738 at Aldersgate Street in London." },
          { text: "Martin Luther", textSwahili: "Martin Luther", isCorrect: false, explanation: "Martin Luther was a reformer, but he did not found Methodism." },
          { text: "George Whitefield", textSwahili: "George Whitefield", isCorrect: false, explanation: "Whitefield was a colleague of Wesley but not the founder." },
          { text: "Charles Wesley", textSwahili: "Charles Wesley", isCorrect: false, explanation: "Charles was John's brother and contributed to Methodism but wasn't the founder." },
        ],
      },
      {
        questionText: "In what year was the Free Methodist Church established?",
        questionTextSwahili: "Kanisa la Methodist Huru lilianzishwa lini?",
        answers: [
          { text: "1860", textSwahili: "1860", isCorrect: true, explanation: "The Free Methodist Church was established in 1860 in New York." },
          { text: "1738", textSwahili: "1738", isCorrect: false, explanation: "1738 was when Wesley had his Aldersgate experience, not when FMC was founded." },
          { text: "1784", textSwahili: "1784", isCorrect: false, explanation: "1784 was when Wesley ordained preachers for America, but FMC was founded later." },
          { text: "1900", textSwahili: "1900", isCorrect: false, explanation: "FMC was established before 1900." },
        ],
      },
      {
        questionText: "What does 'Free' in Free Methodist Church mean?",
        questionTextSwahili: "Nini maana ya 'Huru' katika Kanisa la Methodist Huru?",
        answers: [
          { text: "Freedom from sin through Christ", textSwahili: "Uhuru kutoka dhambi kupitia Kristo", isCorrect: true, explanation: "The 'Free' emphasizes freedom from sin, freedom in worship, and freedom in the Holy Spirit." },
          { text: "No cost to attend church", textSwahili: "Hakuna malipo ya kuhudhuria kanisa", isCorrect: false, explanation: "While FMC has historically offered free pews, 'Free' refers to spiritual freedom." },
          { text: "Freedom from church rules", textSwahili: "Uhuru kutoka sheria za kanisa", isCorrect: false, explanation: "FMC maintains biblical discipline and accountability." },
          { text: "Freedom to choose any beliefs", textSwahili: "Uhuru wa kuchagua imani yoyote", isCorrect: false, explanation: "FMC is grounded in biblical doctrine and Methodist tradition." },
        ],
      },
      {
        questionText: "What was John Wesley's primary concern?",
        questionTextSwahili: "Ni nini kilikuwa ni wasiwasi mkuu wa John Wesley?",
        answers: [
          { text: "Personal holiness and social justice", textSwahili: "Utakatifu wa kibinafsi na haki ya kijamii", isCorrect: true, explanation: "Wesley emphasized both personal sanctification and caring for the poor and marginalized." },
          { text: "Building large church buildings", textSwahili: "Kujenga majengo makubwa ya kanisa", isCorrect: false, explanation: "Wesley focused on spiritual transformation, not architectural grandeur." },
          { text: "Political power", textSwahili: "Nguvu ya kisiasa", isCorrect: false, explanation: "Wesley's focus was spiritual, not political." },
          { text: "Theological debates only", textSwahili: "Mijadala ya kiteolojia tu", isCorrect: false, explanation: "Wesley combined theology with practical ministry to the poor." },
        ],
      },
      {
        questionText: "What is the Methodist emphasis on 'sanctification'?",
        questionTextSwahili: "Ni nini mtaka wa Methodist kuhusu 'utakatifu'?",
        answers: [
          { text: "Growing in holiness throughout life", textSwahili: "Kukua katika utakatifu katika maisha yote", isCorrect: true, explanation: "Sanctification is the process of becoming more holy and Christ-like throughout our Christian journey." },
          { text: "Becoming perfect immediately at conversion", textSwahili: "Kuwa kamili mara moja wakati wa ubadilishaji", isCorrect: false, explanation: "Sanctification is a lifelong process, not instantaneous." },
          { text: "Avoiding all worldly pleasures", textSwahili: "Kuepuka furaha zote za dunia", isCorrect: false, explanation: "Sanctification is about transformation, not just avoidance." },
          { text: "Following church rules strictly", textSwahili: "Kufuata sheria za kanisa kwa ukali", isCorrect: false, explanation: "Sanctification is about heart transformation, not mere rule-following." },
        ],
      },
    ],
  },
  {
    videoId: 2,
    title: "FMC Core Beliefs",
    titleSwahili: "Imani za Msingi za FMC",
    description: "Assess your understanding of the core doctrinal beliefs of the Free Methodist Church.",
    descriptionSwahili: "Tathmini uelewa wako wa imani za msingi za kiteolojia za Kanisa la Methodist Huru.",
    passingScore: 70,
    questions: [
      {
        questionText: "What is the Free Methodist understanding of Scripture?",
        questionTextSwahili: "Ni nini uelewa wa Methodist Huru kuhusu Maandiko Matakatifu?",
        answers: [
          { text: "The Bible is God's authoritative Word", textSwahili: "Biblia ni Neno la Mungu lenye mamlaka", isCorrect: true, explanation: "FMC affirms that the Bible is God's authoritative revelation and guide for faith and practice." },
          { text: "The Bible is one of many holy books", textSwahili: "Biblia ni kitabu kimoja cha vitabu vingi takatifu", isCorrect: false, explanation: "FMC holds Scripture as uniquely authoritative." },
          { text: "Only church leaders can interpret Scripture", textSwahili: "Wapadri tu ndio wanaweza kufasiri Maandiko", isCorrect: false, explanation: "FMC encourages all believers to study and understand Scripture." },
          { text: "The Bible contains errors and contradictions", textSwahili: "Biblia ina makosa na mgogoro", isCorrect: false, explanation: "FMC affirms the reliability and authority of Scripture." },
        ],
      },
      {
        questionText: "What does FMC teach about salvation?",
        questionTextSwahili: "FMC inatufundisha nini kuhusu wokovu?",
        answers: [
          { text: "Salvation comes through faith in Christ", textSwahili: "Wokovu unakuja kupitia imani katika Kristo", isCorrect: true, explanation: "FMC teaches that salvation is available to all through faith in Jesus Christ." },
          { text: "Salvation is earned through good works", textSwahili: "Wokovu unakuja kupitia kazi njema", isCorrect: false, explanation: "FMC teaches salvation is by grace through faith, not earned by works." },
          { text: "Only certain people are chosen for salvation", textSwahili: "Watu wachache tu wamechaguliwa kwa wokovu", isCorrect: false, explanation: "FMC affirms that salvation is available to all who believe." },
          { text: "Salvation cannot be lost", textSwahili: "Wokovu hauwezi kupotea", isCorrect: false, explanation: "While FMC affirms God's grace, it also emphasizes human responsibility in faith." },
        ],
      },
      {
        questionText: "What is the Trinity in FMC doctrine?",
        questionTextSwahili: "Ni nini Utatu katika mafundisho ya FMC?",
        answers: [
          { text: "God exists as Father, Son, and Holy Spirit", textSwahili: "Mungu anakujitokeza kama Baba, Mwana, na Roho Mtakatifu", isCorrect: true, explanation: "FMC affirms the Christian doctrine of the Trinity - one God in three persons." },
          { text: "Three separate gods", textSwahili: "Mungu watatu tofauti", isCorrect: false, explanation: "The Trinity is one God in three persons, not three gods." },
          { text: "Jesus and the Holy Spirit are less than God", textSwahili: "Yesu na Roho Mtakatifu ni chini ya Mungu", isCorrect: false, explanation: "All three persons of the Trinity are fully God." },
          { text: "The Trinity is not important to FMC", textSwahili: "Utatu si muhimu kwa FMC", isCorrect: false, explanation: "The Trinity is foundational to FMC theology." },
        ],
      },
      {
        questionText: "How does FMC understand the Holy Spirit?",
        questionTextSwahili: "FMC inaelewa vipi Roho Mtakatifu?",
        answers: [
          { text: "The Holy Spirit empowers believers for holy living", textSwahili: "Roho Mtakatifu inatoa nguvu kwa waumini kwa maisha takatifu", isCorrect: true, explanation: "FMC emphasizes the Holy Spirit's role in empowering believers for sanctification and service." },
          { text: "The Holy Spirit is just a feeling", textSwahili: "Roho Mtakatifu ni heshima tu", isCorrect: false, explanation: "The Holy Spirit is a person and a powerful force in the believer's life." },
          { text: "Only clergy have the Holy Spirit", textSwahili: "Wapadri tu ndio wanao na Roho Mtakatifu", isCorrect: false, explanation: "All believers receive the Holy Spirit at conversion." },
          { text: "The Holy Spirit is not active today", textSwahili: "Roho Mtakatifu si hai leo", isCorrect: false, explanation: "FMC affirms the Holy Spirit's ongoing work in the church today." },
        ],
      },
      {
        questionText: "What does FMC teach about grace?",
        questionTextSwahili: "FMC inatufundisha nini kuhusu neema?",
        answers: [
          { text: "God's grace is unmerited favor and power for transformation", textSwahili: "Neema ya Mungu ni fadhila isiyostahili na nguvu ya mabadiliko", isCorrect: true, explanation: "FMC teaches that grace is God's free gift that saves us and empowers us to live holy lives." },
          { text: "Grace means we don't need to obey God", textSwahili: "Neema inamaanisha hatuhitaji kumtii Mungu", isCorrect: false, explanation: "Grace motivates obedience, not disobedience." },
          { text: "Grace is only for the wealthy", textSwahili: "Neema ni kwa tajiri tu", isCorrect: false, explanation: "God's grace is available to all people." },
          { text: "Grace is earned through church attendance", textSwahili: "Neema inakuja kupitia kuhudhuria kanisa", isCorrect: false, explanation: "Grace is God's free gift, not earned through works." },
        ],
      },
    ],
  },
  {
    videoId: 3,
    title: "Holy Living: Practical Examples",
    titleSwahili: "Maisha Takatifu: Mifano Inayotumika",
    description: "Test your understanding of holiness and how to live a holy life in practical ways.",
    descriptionSwahili: "Jaribu uelewa wako wa utakatifu na jinsi ya kuishi maisha takatifu kwa njia inayotumika.",
    passingScore: 70,
    questions: [
      {
        questionText: "What does 'holy living' mean in FMC teaching?",
        questionTextSwahili: "Nini maana ya 'maisha takatifu' katika mafundisho ya FMC?",
        answers: [
          { text: "Living in obedience to God and serving others", textSwahili: "Kuishi kwa kumtii Mungu na kumtumikia wengine", isCorrect: true, explanation: "Holy living means surrendering to God's will and demonstrating Christ's love through service." },
          { text: "Avoiding all secular activities", textSwahili: "Kuepuka shughuli zote za dunia", isCorrect: false, explanation: "Holy living is about transformation of heart and purpose, not isolation." },
          { text: "Being morally perfect", textSwahili: "Kuwa na adabu kamili", isCorrect: false, explanation: "Holy living is a process of growth, not perfection." },
          { text: "Following strict rules and regulations", textSwahili: "Kufuata sheria na kanuni kali", isCorrect: false, explanation: "Holy living is about relationship with God, not mere rule-keeping." },
        ],
      },
      {
        questionText: "How should a Christian respond to temptation?",
        questionTextSwahili: "Mkristo anapaswa kujibu vipi kwa jaribu?",
        answers: [
          { text: "Rely on God's strength and flee from sin", textSwahili: "Tegemea nguvu ya Mungu na kukamatia dhambi", isCorrect: true, explanation: "Scripture teaches us to flee temptation and rely on God's grace to overcome it." },
          { text: "Resist temptation through willpower alone", textSwahili: "Kupinga jaribu kupitia nguvu ya nia tu", isCorrect: false, explanation: "We need God's help, not just our own strength." },
          { text: "Avoid all situations where temptation might occur", textSwahili: "Kuepuka hali zote ambapo jaribu linaweza kutokea", isCorrect: false, explanation: "We live in the world and must learn to overcome temptation." },
          { text: "Temptation is not a real problem for believers", textSwahili: "Jaribu si tatizo halisi kwa waumini", isCorrect: false, explanation: "All believers face temptation and need God's help." },
        ],
      },
      {
        questionText: "What is the role of the Holy Spirit in holy living?",
        questionTextSwahili: "Ni nini jukumu la Roho Mtakatifu katika maisha takatifu?",
        answers: [
          { text: "The Holy Spirit empowers and guides us toward holiness", textSwahili: "Roho Mtakatifu inatupa nguvu na kutuongoza kuelekea utakatifu", isCorrect: true, explanation: "The Holy Spirit is essential for sanctification and living a holy life." },
          { text: "The Holy Spirit only convicts us of sin", textSwahili: "Roho Mtakatifu inatukamatia dhambi tu", isCorrect: false, explanation: "The Holy Spirit does more than convict; it empowers and guides." },
          { text: "We must achieve holiness through our own effort", textSwahili: "Lazima tufikiri utakatifu kupitia juhudi zetu", isCorrect: false, explanation: "Holiness is a work of the Holy Spirit in cooperation with our will." },
          { text: "The Holy Spirit is not involved in daily living", textSwahili: "Roho Mtakatifu si katika maisha ya kila siku", isCorrect: false, explanation: "The Holy Spirit is actively involved in every aspect of our lives." },
        ],
      },
      {
        questionText: "How should Christians handle conflicts with others?",
        questionTextSwahili: "Wakristo wanapaswa kushughulikia vipi mgogoro na wengine?",
        answers: [
          { text: "Seek reconciliation and forgiveness following Christ's example", textSwahili: "Tafuta kupatanisha na msamaha kwa kufuata mfano wa Kristo", isCorrect: true, explanation: "Jesus taught us to pursue peace and forgiveness in our relationships." },
          { text: "Avoid the person causing conflict", textSwahili: "Kuepuka mtu anayesababisha mgogoro", isCorrect: false, explanation: "We should seek reconciliation, not avoidance." },
          { text: "Respond with anger and defensiveness", textSwahili: "Kujibu kwa hasira na kujilinda", isCorrect: false, explanation: "Christ calls us to respond with love and grace." },
          { text: "Let conflicts continue without addressing them", textSwahili: "Kuruhusu mgogoro kuendelea bila kuushughulikia", isCorrect: false, explanation: "We should address conflicts with wisdom and grace." },
        ],
      },
      {
        questionText: "What is the connection between faith and works in holy living?",
        questionTextSwahili: "Ni nini uhusiano kati ya imani na kazi katika maisha takatifu?",
        answers: [
          { text: "Faith produces works as evidence of transformation", textSwahili: "Imani inazalisha kazi kama ushahidi wa mabadiliko", isCorrect: true, explanation: "True faith in Christ naturally produces good works and holy living." },
          { text: "Works are more important than faith", textSwahili: "Kazi ni muhimu zaidi kuliko imani", isCorrect: false, explanation: "Faith is the foundation; works are the fruit." },
          { text: "Works are unnecessary if you have faith", textSwahili: "Kazi si muhimu ikiwa una imani", isCorrect: false, explanation: "True faith produces works." },
          { text: "There is no connection between faith and works", textSwahili: "Hakuna uhusiano kati ya imani na kazi", isCorrect: false, explanation: "Faith and works are intimately connected in Christian living." },
        ],
      },
    ],
  },
  {
    videoId: 4,
    title: "FMC Church Organization",
    titleSwahili: "Muundo wa Kanisa la FMC",
    description: "Understand how the Free Methodist Church is organized and how decisions are made.",
    descriptionSwahili: "Elewa jinsi Kanisa la Methodist Huru linavyoanzishwa na jinsi maamuzi yanavyofanywa.",
    passingScore: 70,
    questions: [
      {
        questionText: "What is the basic unit of FMC organization?",
        questionTextSwahili: "Ni nini kitengo cha msingi cha muundo wa FMC?",
        answers: [
          { text: "The local congregation", textSwahili: "Jamii ya ndani", isCorrect: true, explanation: "The local church congregation is the foundation of FMC organization." },
          { text: "The denomination headquarters", textSwahili: "Makao makuu ya kanisa", isCorrect: false, explanation: "While important, the headquarters serves the local churches." },
          { text: "The pastoral office", textSwahili: "Ofisi ya padri", isCorrect: false, explanation: "The pastor serves the congregation, not vice versa." },
          { text: "The district conference", textSwahili: "Mkutano wa kanda", isCorrect: false, explanation: "Districts serve to coordinate local churches." },
        ],
      },
      {
        questionText: "How are decisions typically made in FMC churches?",
        questionTextSwahili: "Maamuzi yanavyofanywa vipi kawaida katika kanisa za FMC?",
        answers: [
          { text: "Through democratic processes with congregational input", textSwahili: "Kupitia michakato ya kidimokrasia na mchango wa jamii", isCorrect: true, explanation: "FMC values congregational participation in decision-making." },
          { text: "By the pastor alone", textSwahili: "Na padri peke yake", isCorrect: false, explanation: "FMC emphasizes shared leadership and congregational input." },
          { text: "By a small elite group", textSwahili: "Na kundi dogo la waangalizi", isCorrect: false, explanation: "FMC values broad participation." },
          { text: "By the denomination headquarters", textSwahili: "Na makao makuu ya kanisa", isCorrect: false, explanation: "Local churches have significant autonomy." },
        ],
      },
      {
        questionText: "What is the role of the pastor in FMC?",
        questionTextSwahili: "Ni nini jukumu la padri katika FMC?",
        answers: [
          { text: "To shepherd the flock and equip believers for ministry", textSwahili: "Kuangalia kundi na kuandaa waumini kwa huduma", isCorrect: true, explanation: "The pastor is called to lead, teach, and equip the congregation." },
          { text: "To make all decisions for the church", textSwahili: "Kufanya maamuzi yote ya kanisa", isCorrect: false, explanation: "Leadership is shared in FMC." },
          { text: "To focus only on preaching", textSwahili: "Kuzingatia mahubiri tu", isCorrect: false, explanation: "Pastoral ministry is broader than preaching." },
          { text: "To enforce strict rules and discipline", textSwahili: "Kutekeleza sheria na nidhamu kali", isCorrect: false, explanation: "Pastors lead with grace and wisdom." },
        ],
      },
      {
        questionText: "What is a district in FMC organization?",
        questionTextSwahili: "Ni nini kanda katika muundo wa FMC?",
        answers: [
          { text: "A group of local churches in a geographic area", textSwahili: "Kundi la kanisa za ndani katika eneo la jiografia", isCorrect: true, explanation: "Districts coordinate and support local churches in their region." },
          { text: "The highest level of church authority", textSwahili: "Kiwango cha juu cha mamlaka ya kanisa", isCorrect: false, explanation: "Districts serve a coordinating role, not the highest authority." },
          { text: "A building where church meetings occur", textSwahili: "Jengo ambapo mikutano ya kanisa inafanyika", isCorrect: false, explanation: "A district is an organizational structure, not a building." },
          { text: "A group of pastors who make all decisions", textSwahili: "Kundi la wapadri wanaofanya maamuzi yote", isCorrect: false, explanation: "Districts include both clergy and lay leaders." },
        ],
      },
      {
        questionText: "How does FMC balance centralized and local authority?",
        questionTextSwahili: "FMC inabalansi vipi mamlaka ya kituo na ya ndani?",
        answers: [
          { text: "Local churches have significant autonomy while being part of the larger denomination", textSwahili: "Kanisa za ndani zina uhuru mkubwa wakati kuwa sehemu ya kanisa kubwa", isCorrect: true, explanation: "FMC maintains both local church freedom and denominational unity." },
          { text: "The denomination controls all local church decisions", textSwahili: "Kanisa linalodhibiti maamuzi yote ya kanisa za ndani", isCorrect: false, explanation: "Local churches have real autonomy in FMC." },
          { text: "Local churches are completely independent", textSwahili: "Kanisa za ndani ni huru kabisa", isCorrect: false, explanation: "Local churches are part of the larger FMC family." },
          { text: "There is constant conflict between local and denominational authority", textSwahili: "Kuna mgogoro wa mara kwa mara kati ya mamlaka ya ndani na ya kanisa", isCorrect: false, explanation: "FMC seeks to balance both levels of authority." },
        ],
      },
    ],
  },
  {
    videoId: 5,
    title: "FMC Leadership Roles",
    titleSwahili: "Majukumu ya Uongozi wa FMC",
    description: "Learn about the different leadership roles in the Free Methodist Church and their responsibilities.",
    descriptionSwahili: "Jifunze kuhusu majukumu tofauti ya uongozi katika Kanisa la Methodist Huru na wajibu wao.",
    passingScore: 70,
    questions: [
      {
        questionText: "What is the primary role of a deacon in FMC?",
        questionTextSwahili: "Ni nini jukumu la msingi la deken katika FMC?",
        answers: [
          { text: "To serve the church and care for those in need", textSwahili: "Kumtumikia kanisa na kuangalia wasiojiweza", isCorrect: true, explanation: "Deacons are called to serve with compassion and meet practical needs." },
          { text: "To preach and teach doctrine", textSwahili: "Mahubiri na kufundisha mafundisho", isCorrect: false, explanation: "While deacons may teach, their primary role is service." },
          { text: "To manage all church finances", textSwahili: "Kusimamia fedha zote za kanisa", isCorrect: false, explanation: "Deacons may help, but financial management is broader." },
          { text: "To discipline church members", textSwahili: "Kuadhibu wanachama wa kanisa", isCorrect: false, explanation: "Deacons serve with compassion, not primarily discipline." },
        ],
      },
      {
        questionText: "What qualifications should a pastor have in FMC?",
        questionTextSwahili: "Padri wa FMC anapaswa kuwa na sifa gani?",
        answers: [
          { text: "Called by God, spiritually mature, and trained in Scripture and theology", textSwahili: "Akitwa na Mungu, akiwa na akili ya kiroho, na kufunzwa Maandiko na kiteolojia", isCorrect: true, explanation: "FMC requires pastors to be called, spiritually mature, and well-trained." },
          { text: "Wealthy and well-educated in secular subjects", textSwahili: "Tajiri na elimu nzuri katika somo la dunia", isCorrect: false, explanation: "Spiritual qualifications are more important than wealth." },
          { text: "Able to manage large budgets", textSwahili: "Kuweza kusimamia bajeti kubwa", isCorrect: false, explanation: "While helpful, financial management is not the primary qualification." },
          { text: "Popular and charismatic", textSwahili: "Maadhimika na wenye mvuto", isCorrect: false, explanation: "Spiritual maturity is more important than charisma." },
        ],
      },
      {
        questionText: "What is the role of lay leaders in FMC?",
        questionTextSwahili: "Ni nini jukumu la viongozi wa kawaida katika FMC?",
        answers: [
          { text: "To support the pastor and lead in ministry with the congregation", textSwahili: "Kusaidia padri na kuongoza katika huduma na jamii", isCorrect: true, explanation: "Lay leaders are essential partners in ministry alongside the pastor." },
          { text: "To follow orders from the pastor without question", textSwahili: "Kufuata amri za padri bila swali", isCorrect: false, explanation: "Lay leaders are partners, not merely followers." },
          { text: "To manage only financial and administrative tasks", textSwahili: "Kusimamia kazi za fedha na utendaji tu", isCorrect: false, explanation: "Lay leaders have broader spiritual roles." },
          { text: "To have no real authority or responsibility", textSwahili: "Kuwa na mamlaka au wajibu wa kweli", isCorrect: false, explanation: "Lay leaders have significant roles and responsibilities." },
        ],
      },
      {
        questionText: "How are leaders selected and ordained in FMC?",
        questionTextSwahili: "Viongozi huchaguliwa na kutiwa mafuta vipi katika FMC?",
        answers: [
          { text: "Through prayer, discernment, and confirmation by the church community", textSwahili: "Kupitia sala, uelewa, na uthibitisho wa jamii ya kanisa", isCorrect: true, explanation: "FMC seeks God's guidance in selecting and ordaining leaders." },
          { text: "By appointment from denominational headquarters", textSwahili: "Kwa ajili ya makao makuu ya kanisa", isCorrect: false, explanation: "While the denomination is involved, local discernment is important." },
          { text: "Based on education and credentials alone", textSwahili: "Kulingana na elimu na cheti tu", isCorrect: false, explanation: "Spiritual calling and character are more important." },
          { text: "Through a democratic vote without spiritual discernment", textSwahili: "Kupitia kura bila uelewa wa kiroho", isCorrect: false, explanation: "Spiritual discernment is central to FMC leadership selection." },
        ],
      },
      {
        questionText: "What is expected of FMC leaders regarding personal holiness?",
        questionTextSwahili: "Nini inatarajiwa kwa viongozi wa FMC kuhusu utakatifu wa kibinafsi?",
        answers: [
          { text: "Leaders should model holy living and spiritual maturity", textSwahili: "Viongozi wanapaswa kuonyesha maisha takatifu na akili ya kiroho", isCorrect: true, explanation: "FMC leaders are called to be examples of faith and holiness." },
          { text: "Personal holiness is not important for leaders", textSwahili: "Utakatifu wa kibinafsi si muhimu kwa viongozi", isCorrect: false, explanation: "Personal holiness is essential for leaders." },
          { text: "Leaders can live however they want in private", textSwahili: "Viongozi wanaweza kuishi jinsi wanavyotaka katika siri", isCorrect: false, explanation: "Leaders are called to consistency in public and private life." },
          { text: "Only pastors need to be holy; other leaders don't", textSwahili: "Wapadri tu ndio wanahitaji kuwa takatifu; viongozi wengine wala", isCorrect: false, explanation: "All leaders are called to model holiness." },
        ],
      },
    ],
  },
  {
    videoId: 6,
    title: "FMC Social Justice",
    titleSwahili: "Haki ya Kijamii ya FMC",
    description: "Understand FMC's commitment to social justice and caring for the marginalized.",
    descriptionSwahili: "Elewa jitihada ya FMC kuhusu haki ya kijamii na kuangalia wasiojiweza.",
    passingScore: 70,
    questions: [
      {
        questionText: "What is John Wesley's teaching on caring for the poor?",
        questionTextSwahili: "Nini mafundisho ya John Wesley kuhusu kuangalia maskini?",
        answers: [
          { text: "Christians have a responsibility to help the poor and marginalized", textSwahili: "Wakristo wana wajibu wa kusaidia maskini na wasiojiweza", isCorrect: true, explanation: "Wesley taught that faith must result in action to help those in need." },
          { text: "The poor are responsible for their own situation", textSwahili: "Maskini wanajibika kwa hali yao", isCorrect: false, explanation: "While personal responsibility matters, Christians are called to help." },
          { text: "Helping the poor is optional for Christians", textSwahili: "Kusaidia maskini ni kwa hiari kwa wakristo", isCorrect: false, explanation: "Wesley saw it as a Christian obligation." },
          { text: "Only the government should help the poor", textSwahili: "Serikali tu inapaswa kusaidia maskini", isCorrect: false, explanation: "Christians have a direct responsibility." },
        ],
      },
      {
        questionText: "How does FMC understand the connection between faith and social action?",
        questionTextSwahili: "FMC inaelewa vipi uhusiano kati ya imani na hatua ya kijamii?",
        answers: [
          { text: "True faith must result in action to help others and pursue justice", textSwahili: "Imani ya kweli lazima isababishe hatua ya kusaidia wengine na kutafuta haki", isCorrect: true, explanation: "FMC teaches that faith and works are inseparable." },
          { text: "Social action is separate from spiritual faith", textSwahili: "Hatua ya kijamii ni tofauti na imani ya kiroho", isCorrect: false, explanation: "FMC integrates faith and social action." },
          { text: "Spiritual concerns are more important than social concerns", textSwahili: "Wasiwasi wa kiroho ni muhimu zaidi kuliko wasiwasi wa kijamii", isCorrect: false, explanation: "FMC values both equally." },
          { text: "Christians should focus only on personal salvation", textSwahili: "Wakristo wanapaswa kuzingatia wokovu wa kibinafsi tu", isCorrect: false, explanation: "FMC teaches a holistic gospel." },
        ],
      },
      {
        questionText: "What are examples of FMC social justice ministries?",
        questionTextSwahili: "Ni mifano gani ya huduma za haki ya kijamii ya FMC?",
        answers: [
          { text: "Feeding the hungry, housing the homeless, advocating for the oppressed", textSwahili: "Kulipia wenye njaa, kukamatia wasiojiweza, kutetea wasiozingatiwa", isCorrect: true, explanation: "FMC engages in practical ministries to address social needs." },
          { text: "Only preaching about justice without action", textSwahili: "Mahubiri tu kuhusu haki bila hatua", isCorrect: false, explanation: "FMC combines proclamation with action." },
          { text: "Focusing only on spiritual salvation", textSwahili: "Kuzingatia wokovu wa kiroho tu", isCorrect: false, explanation: "FMC addresses both spiritual and physical needs." },
          { text: "Avoiding involvement in social issues", textSwahili: "Kuepuka kushiriki katika maswala ya kijamii", isCorrect: false, explanation: "FMC is actively involved in social justice." },
        ],
      },
      {
        questionText: "How should FMC churches respond to poverty in their communities?",
        questionTextSwahili: "Kanisa za FMC zinapaswa kujibu vipi maskini katika jamii zao?",
        answers: [
          { text: "With compassion, practical help, and advocacy for systemic change", textSwahili: "Kwa huruma, msaada wa vitendo, na kutetea mabadiliko ya mfumo", isCorrect: true, explanation: "FMC addresses both immediate needs and underlying causes." },
          { text: "By ignoring poverty and focusing on spiritual matters", textSwahili: "Kwa kupuuza maskini na kuzingatia maswala ya kiroho", isCorrect: false, explanation: "FMC integrates spiritual and social concerns." },
          { text: "By blaming the poor for their situation", textSwahili: "Kwa kulaumu maskini kwa hali yao", isCorrect: false, explanation: "FMC responds with compassion, not blame." },
          { text: "By waiting for the government to solve all problems", textSwahili: "Kwa kusubiri serikali kutatua matatizo yote", isCorrect: false, explanation: "Churches have a direct responsibility to help." },
        ],
      },
      {
        questionText: "What does FMC teach about economic justice?",
        questionTextSwahili: "FMC inatufundisha nini kuhusu haki ya kiuchumi?",
        answers: [
          { text: "Wealth should be used to help others and promote fairness", textSwahili: "Mali inapaswa kutumiwa kusaidia wengine na kueneza haki", isCorrect: true, explanation: "FMC teaches responsible stewardship and economic fairness." },
          { text: "Accumulating wealth is the primary goal of life", textSwahili: "Kukusanya mali ni lengo la msingi la maisha", isCorrect: false, explanation: "FMC teaches that wealth should serve God's purposes." },
          { text: "Economic justice is not a Christian concern", textSwahili: "Haki ya kiuchumi si wasiwasi wa Mkristo", isCorrect: false, explanation: "FMC sees economic justice as a Christian responsibility." },
          { text: "Only the wealthy have responsibility for justice", textSwahili: "Tajiri tu ndio wanajibika kwa haki", isCorrect: false, explanation: "All Christians have responsibility according to their ability." },
        ],
      },
    ],
  },
];
