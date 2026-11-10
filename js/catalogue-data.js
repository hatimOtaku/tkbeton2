/* Catalogue content, transcribed from catalogue/catalogue-tk-beton.pdf (40 pages).
   Every text is { fr, en, ar }. Model names are proper names and are never translated.
   Pictures in catalogue/img/ are cut from the PDF pages. */
(function () {
  'use strict';
  function L(fr, en, ar) { return { fr: fr, en: en, ar: ar }; }

  var UI = {
    chapters: {
      intro: L('Présentation', 'About', 'تقديم'),
      paves: L('Pavés', 'Pavers', 'البلاطات'),
      pose: L('Technique de pose', 'Laying', 'التركيب'),
      bordures: L('Bordures & caniveaux', 'Kerbs & channels', 'الأرصفة والقنوات'),
      mobilier: L('Mobilier urbain', 'Street furniture', 'الأثاث الحضري'),
      fin: L('Galerie & contact', 'Gallery & contact', 'المعرض والاتصال')
    },
    goto: L('Aller à…', 'Go to…', 'انتقل إلى…'),
    specs: L('Spécifications techniques', 'Technical specifications', 'المواصفات التقنية'),
    format: L('Format', 'Size', 'المقاس'),
    chamfer: L('Chanfrein', 'Chamfer', 'حافة مشطوفة'),
    thick: L('Épaisseur', 'Thickness', 'السُّمك'),
    colour: L('Couleur', 'Colour', 'اللون'),
    colourVal: L('Divers', 'Various', 'متنوعة'),
    finish: L('Finition', 'Finish', 'التشطيب'),
    finishVal: L('Double couche', 'Double layer', 'طبقتان'),
    layers: L('Nombre de filets', 'Layers per pallet', 'عدد الطبقات في المنصة'),
    m2: L('m² / filet', 'm² per layer', 'م² لكل طبقة'),
    pallet: L('Poids / palette', 'Weight per pallet', 'الوزن لكل منصة'),
    norm: L('Norme', 'Standard', 'المعيار'),
    yes: L('Oui', 'Yes', 'نعم'),
    no: L('Non', 'No', 'لا'),
    use: L('Utilisation', 'Use', 'الاستعمال'),
    tol: L('Tolérance dimensionnelle', 'Dimensional tolerance', 'التفاوت في الأبعاد'),
    mech: L('Caractéristiques mécaniques et physiques', 'Mechanical and physical properties', 'الخصائص الميكانيكية والفيزيائية'),
    lw: L('Longueur & largeur', 'Length & width', 'الطول والعرض'),
    absorb: L('Absorption d’eau', 'Water absorption', 'امتصاص الماء'),
    absorbVal: L('≤ 9 % en moyenne', '≤ 9 % on average', '≤ 9 % في المتوسط'),
    split: L('Résistance à la rupture par fendage (moyenne)', 'Splitting tensile strength (average)', 'مقاومة الكسر بالشق (في المتوسط)'),
    abrasion: L('Résistance à l’abrasion', 'Abrasion resistance', 'مقاومة التآكل'),
    colours: L('Les couleurs de nos pavés', 'Our paver colours', 'ألوان بلاطاتنا'),
    coloursNb: L('Les couleurs à l’écran ne reflètent pas exactement la réalité.', 'On-screen colours do not exactly match the real product.', 'الألوان على الشاشة لا تعكس الواقع تماماً.'),
    finishes: L('Les finitions de nos pavés', 'Our paver finishes', 'تشطيبات بلاطاتنا'),
    smooth: L('Finition lisse', 'Smooth finish', 'تشطيب ناعم'),
    rough: L('Finition rugueuse', 'Textured finish', 'تشطيب خشن'),
    antistain: L('Traitement anti-taches en option', 'Optional anti-stain treatment', 'معالجة مضادة للبقع (اختيارية)'),
    pattern: L('Exemples de calpinage', 'Laying pattern examples', 'أمثلة على أنماط التركيب'),
    parts: L('Pièces', 'Pieces', 'القطع'),
    quote: L('Demander un devis', 'Request a quote', 'اطلب عرض سعر'),
    models: L('17 modèles', '17 models', '17 نموذجاً'),
    pick: L('Touchez un modèle pour voir sa fiche.', 'Tap a model to see its sheet.', 'اضغطوا على نموذج لعرض بطاقته.'),
    length: L('Longueur', 'Length', 'الطول'),
    width: L('Largeur', 'Width', 'العرض'),
    height: L('Hauteur', 'Height', 'الارتفاع'),
    depth: L('Profondeur', 'Depth', 'العمق'),
    weight: L('Poids', 'Weight', 'الوزن'),
    rounded: L('Arrondi', 'Rounded edge', 'حافة مستديرة'),
    natural: L('Béton naturel', 'Natural concrete', 'خرسانة طبيعية'),
    various: L('Divers', 'Various', 'متنوعة'),
    model: L('Désignation', 'Model', 'التسمية'),
    lengthMl: L('Longueur (ml)', 'Length (m)', 'الطول (م)'),
    tolerances: L('Tolérances', 'Tolerances', 'التفاوتات'),
    kgPiece: L('Poids / pièce', 'Weight / piece', 'الوزن / قطعة'),
    perPallet: L('Pièces / palette', 'Pieces / pallet', 'قطع / منصة'),
    kgPallet: L('Poids / palette', 'Weight / pallet', 'الوزن / منصة'),
    resist: L('Résistance moyenne (MPa)', 'Average strength (MPa)', 'المقاومة المتوسطة (ميغاباسكال)'),
    classB1: L('Classe B1', 'Class B1', 'الفئة B1'),
    classB2: L('Classe B2', 'Class B2', 'الفئة B2'),
    assembly: L('Modèle d’assemblage', 'Assembly example', 'نموذج التجميع'),
    seatThick: L('Épaisseur d’assise', 'Seat thickness', 'سُمك المقعد'),
    clearance: L('Hauteur libre', 'Clearance', 'الارتفاع الحر'),
    legs: L('Pieds', 'Legs', 'الأرجل'),
    diameter: L('Diamètre', 'Diameter', 'القطر'),
    base: L('Base', 'Base', 'القاعدة'),
    top: L('Sommet', 'Top', 'القمة'),
    plinth: L('Socle', 'Plinth', 'القاعدة السفلية'),
    ring: L('Avec arceau', 'With hoop', 'مع قوس'),
    step: L('Étape', 'Step', 'المرحلة'),
    download: L('Télécharger le catalogue PDF', 'Download the PDF catalogue', 'تحميل الكتالوج PDF'),
    usine: L('Kénitra — usine', 'Kénitra — factory', 'القنيطرة — المصنع'),
    siege: L('Casablanca — siège', 'Casablanca — head office', 'الدار البيضاء — المقر'),
    tel: L('Tél.', 'Tel.', 'الهاتف'),
    fax: L('Fax', 'Fax', 'الفاكس'),
    gsm: L('GSM', 'Mobile', 'المحمول'),
    email: L('E-mail', 'Email', 'البريد'),
    groupe: L('Groupe BES', 'BES Group', 'مجموعة BES')
  };

  var USE = {
    p: L('Parkings', 'Car parks', 'مواقف السيارات'),
    ped: L('Piétons', 'Pedestrians', 'المشاة'),
    car: L('Véhicules légers', 'Light vehicles', 'السيارات الخفيفة'),
    truck: L('Camions', 'Trucks', 'الشاحنات'),
    truck35: L('Camions jusqu’à 3,5 t', 'Trucks up to 3.5 t', 'شاحنات حتى 3.5 طن'),
    heavy8: L('Poids lourds (ép. 8 cm)', 'Heavy goods vehicles (8 cm thick)', 'الشاحنات الثقيلة (سُمك 8 سم)'),
    heavy9: L('Poids lourds (ép. 9 cm)', 'Heavy goods vehicles (9 cm thick)', 'الشاحنات الثقيلة (سُمك 9 سم)'),
    port: L('Zones portuaires', 'Port areas', 'المناطق المينائية')
  };

  var COLOURS = [
    ['#e0a22b', L('Jaune', 'Yellow', 'أصفر')],
    ['#bdbcb8', L('Gris naturel', 'Natural grey', 'رمادي طبيعي')],
    ['#8e8d8a', L('Gris souris', 'Mouse grey', 'رمادي فأري')],
    ['#3e3e3d', L('Gris anthracite', 'Anthracite grey', 'رمادي فحمي')],
    ['#4f87b4', L('Bleu', 'Blue', 'أزرق')],
    ['#d65a40', L('Rouge', 'Red', 'أحمر')],
    ['#ad652f', L('Marron', 'Brown', 'بني')],
    ['#ead8a6', L('Beige', 'Beige', 'بيج')],
    ['#5aa553', L('Vert clair', 'Light green', 'أخضر فاتح')]
  ];

  /* id, name, PDF page, format, chamfer, thickness, layers, m²/layer, weight/pallet, use, ecoline, parts */
  var PAVES = [
    ['agadir', 'Agadir', 6, '22 × 11 cm', true, '6 cm · 8 cm', '14 (6 cm) · 12 (8 cm)', '1 m²', '≈ 1 820 kg (6 cm) · 2 140 kg (8 cm)', ['p', 'ped', 'car', 'truck', 'heavy8']],
    ['chellah', 'Chellah', 7, '10 × 10 cm', true, '6 cm', '14', '0,90 m²', '≈ 1 960 kg', ['p', 'ped', 'car', 'truck35']],
    ['cristal', 'Cristal', 8, '20 × 20 × 10 cm', true, '6 cm', '14', '1 m²', '≈ 2 000 kg', ['p', 'ped', 'car', 'truck35'], false, '17,8 × 11,8 · 11,8 × 11,8 · 6 × 11,8 cm'],
    ['double-t', 'Double T', 9, '20 × 16 cm', true, '6 cm · 8 cm', '14 (6 cm) · 12 (8 cm)', '1,03 m²', '≈ 1 880 kg (6 cm) · 2 140 kg (8 cm)', ['p', 'ped', 'car', 'truck35', 'heavy8']],
    ['fes-rustique', 'Fès Rustique', 10, '23 × 14 · 14 × 14 · 9 × 14 cm', true, '6 cm', '14', '1,03 m²', '≈ 1 960 kg', ['p', 'ped', 'car', 'truck35']],
    ['kasbah', 'Kasbah', 11, '18 × 8 × 11,4 cm', true, '6 cm', '14', '1,00 m²', '≈ 1 720 kg', ['p', 'ped', 'car', 'truck35']],
    ['hallala', 'Hallala', 12, '13,5 × 13,5 cm', false, '6 cm', '14', '1,20 m²', '≈ 2 260 kg', ['p', 'ped', 'car', 'truck35']],
    ['kenitra', 'Kenitra', 13, '25 × 12,5 cm', false, '7 cm', '14', '1,10 m²', '≈ 1 940 kg', ['p', 'ped', 'car', 'truck35']],
    ['lixus', 'Lixus', 14, '15 × 15 cm', false, '8 cm', '12', '1,08 m²', '≈ 2 360 kg', ['p', 'ped', 'car', 'truck35', 'heavy8']],
    ['mehdia', 'Mehdia', 15, '20 × 10 cm', true, '6 cm', '14', '1,00 m²', '≈ 1 940 kg', ['p', 'ped', 'car', 'truck35']],
    ['meknes', 'Meknès', 16, '22,7 × 13,7 cm', true, '6 cm', '14', '0,95 m²', '≈ 1 720 kg', ['p', 'ped', 'car', 'truck35']],
    ['tanger-med', 'Tanger Med', 17, '10 × 20 cm', true, '8 cm', '12', '1,08 m²', '≈ 2 300 kg', ['p', 'ped', 'car', 'truck35', 'heavy8', 'port']],
    ['tk-port', 'TK Port', 18, '20 × 20 × 10 cm', true, '8 cm', '12', '1 m²', '≈ 2 140 kg', ['p', 'ped', 'car', 'truck35', 'heavy8', 'port']],
    ['volubilis', 'Volubilis', 19, '20 × 20 cm', true, '6 cm', '14', '1,00 m²', '≈ 1 960 kg', ['p', 'ped', 'car', 'truck35']],
    ['bouregreg', 'Bouregreg', 20, '20 × 15,5 cm', true, '9 cm', '11', '1,08 m²', '≈ 2 300 kg', ['p', 'ped', 'car', 'truck', 'heavy9'], true],
    ['sebou', 'Sebou', 21, '43 × 43 cm', true, '8 cm', '12', '1,00 m²', '≈ 2 140 kg', ['p', 'ped', 'car', 'truck35'], true],
    ['oum-rabie', 'Oum Rabie', 22, '50 × 50 cm', true, '8 cm', '11', '1,00 m²', '≈ 1 200 kg', ['p', 'ped', 'car', 'truck35'], true]
  ];

  var TEXT = {
    coverKicker: L('Beton Engineering · Groupe BES', 'Beton Engineering · BES Group', 'Beton Engineering · مجموعة BES'),
    coverTitle: L('Fabrication des produits en béton préfabriqué pour l’aménagement d’extérieur.', 'Precast concrete products for outdoor landscaping.', 'تصنيع منتجات الخرسانة الجاهزة لتهيئة الفضاءات الخارجية.'),
    coverWords: L(['Formes', 'Couleurs', 'Design', 'Qualité', 'Tendances'], ['Shapes', 'Colours', 'Design', 'Quality', 'Trends'], ['الأشكال', 'الألوان', 'التصميم', 'الجودة', 'التوجهات']),
    contactsTitle: L('Contacts', 'Contacts', 'جهات الاتصال'),
    coverGo: L('Aller directement aux produits :', 'Go straight to the products:', 'انتقلوا مباشرة إلى المنتجات:'),
    aboutTitle: L('Qui sommes-nous', 'About us', 'من نحن'),
    aboutLead: L('<b>TK BÉTON</b> est le leader des fabricants de produits en béton préfabriqué pour l’aménagement d’extérieur, avec plus de 25 ans de savoir-faire.',
      '<b>TK BÉTON</b> is the leading maker of precast concrete products for outdoor landscaping, with more than 25 years of know-how.',
      '<b>تي كي بيتون</b> رائدة في تصنيع منتجات الخرسانة الجاهزة لتهيئة الفضاءات الخارجية، بخبرة تفوق 25 سنة.'),
    aboutPoints: L([
      'Pavés, bordures, caniveaux, mobilier urbain…, conçus et fabriqués dans une démarche de qualité totale.',
      'Qualité conforme aux normes nationales et européennes.',
      'Produits de série, et réalisations sur mesure pour architectes et bureaux d’études.',
      'Matières premières choisies chez des fournisseurs qui suivent un cahier des charges rigoureux.'
    ], [
      'Pavers, kerbs, channels, street furniture…, designed and made within a total quality approach.',
      'Quality that meets national and European standards.',
      'Standard ranges, plus made-to-measure work for architects and engineering firms.',
      'Raw materials sourced from suppliers who follow strict specifications.'
    ], [
      'بلاطات، أرصفة، قنوات تصريف، أثاث حضري…، مصممة ومصنّعة في إطار مقاربة الجودة الشاملة.',
      'جودة مطابقة للمعايير الوطنية والأوروبية.',
      'منتجات قياسية، وإنجازات حسب الطلب للمهندسين المعماريين ومكاتب الدراسات.',
      'مواد أولية مختارة لدى موردين يلتزمون بدفتر تحملات صارم.'
    ]),
    whyPoints: L([
      'Durables, économiques et écologiques (sol drainant), avec un grand choix de designs et de couleurs.',
      'Démontables et remontables : idéal en ville pour les travaux de réseaux (assainissement, câblage électrique…).',
      'Pour chaussées, rues piétonnes, esplanades, allées de jardin, parkings, aires de stockage industrielles, terminaux portuaires et talus de piles de ponts, en trafic léger ou lourd.'
    ], [
      'Durable, economical and ecological (draining ground), with a wide choice of designs and colours.',
      'Can be lifted and relaid: ideal in towns for network works (sewerage, electrical cabling…).',
      'For roads, pedestrian streets, squares, garden paths, car parks, industrial storage yards, port terminals and bridge-pier embankments, for light or heavy traffic.'
    ], [
      'متينة واقتصادية وصديقة للبيئة (أرضية مُصرِّفة للماء)، مع تشكيلة واسعة من التصاميم والألوان.',
      'قابلة للفك وإعادة التركيب: مثالية في المدن لأشغال الشبكات (التطهير، الكابلات الكهربائية…).',
      'للطرق، والشوارع المخصصة للراجلين، والساحات، وممرات الحدائق، ومواقف السيارات، ومناطق التخزين الصناعي، والمحطات المينائية، ومنحدرات دعامات الجسور، لحركة مرور خفيفة أو كثيفة.'
    ]),
    whyTitle: L('Pourquoi le choix des pavés ?', 'Why choose pavers?', 'لماذا اختيار البلاطات؟'),
    pavesTitle: L('Pavés autobloquants', 'Interlocking pavers', 'البلاطات المتشابكة'),
    pavesLead: L('Tous nos pavés sont fabriqués en double couche selon la norme EN 1338, en 9 coloris et 2 finitions.', 'All our pavers are made in two layers to EN 1338, in 9 colours and 2 finishes.', 'تُصنع جميع بلاطاتنا من طبقتين وفق المعيار EN 1338، بـ 9 ألوان وتشطيبين.'),
    poseTitle: L('Technique de pose (pavés)', 'Laying technique (pavers)', 'تقنية تركيب البلاطات'),
    generalTitle: L('Généralités', 'General notes', 'عموميات'),
    general: L([
      'Quel que soit le revêtement choisi, il doit toujours être posé avec une pente de 2 % minimum. La pente du fond de forme doit être identique à celle du sol fini. Prévoyez également des évacuations d’eau.',
      'Des nuances de teintes dues aux matériaux naturels peuvent exister. Approvisionnez la totalité des produits avant le démarrage des travaux et, lors de la pose, panachez impérativement les palettes.',
      'Quelques variations dimensionnelles inhérentes à l’aspect volontairement rustique de nos produits peuvent être constatées. Elles ne peuvent pas faire l’objet d’une réclamation tant qu’elles restent dans les tolérances généralement admises.',
      'Dès réception, vérifiez que les produits correspondent à vos attentes ; sinon, prévenez-nous avant la pose.',
      'Respectez les normes en vigueur sur l’épaisseur des produits selon leur utilisation (piétons, circulation limitée, circulation intense…).',
      'Pour être recevables, les réclamations d’aspect ou autres doivent être faites avant la pose. Notre responsabilité se limite au remplacement des produits défectueux, à l’exclusion de toute participation aux frais de dépose et de repose.'
    ], [
      'Whatever surface you choose, always lay it with a minimum slope of 2 %. The sub-base must have the same slope as the finished surface. Also plan water drainage.',
      'Natural materials can cause slight colour variations. Have all products delivered before work starts, and always mix pallets while laying.',
      'Some dimensional variation is part of the deliberately rustic look of our products. It cannot be grounds for a claim as long as it stays within generally accepted tolerances.',
      'On delivery, check that the products are what you expected; if not, tell us before laying.',
      'Follow the standards in force for product thickness according to use (pedestrian, limited traffic, heavy traffic…).',
      'Claims about appearance or anything else must be made before laying. Our liability is limited to replacing faulty products and excludes any cost of lifting and relaying.'
    ], [
      'مهما كان نوع التكسية المختار، يجب تركيبه دائماً بميل لا يقل عن 2 %. ويجب أن يكون ميل الأساس مطابقاً لميل الأرضية النهائية. وخططوا كذلك لتصريف المياه.',
      'قد توجد فروق طفيفة في الألوان بسبب المواد الطبيعية. وفّروا جميع المنتجات قبل بدء الأشغال، واخلطوا المنصات حتماً أثناء التركيب.',
      'قد تُلاحظ بعض الفروق في الأبعاد الملازمة للمظهر التقليدي المقصود لمنتجاتنا، ولا يمكن أن تكون موضوع شكاية ما دامت ضمن التفاوتات المقبولة عموماً.',
      'تحققوا عند الاستلام من مطابقة المنتجات لما تنتظرونه، وإلا فأخبرونا قبل التركيب.',
      'احترموا المعايير الجاري بها العمل بخصوص سُمك المنتجات حسب استعمالها (راجلون، حركة محدودة، حركة كثيفة…).',
      'لتُقبل الشكايات المتعلقة بالمظهر أو غيره، يجب تقديمها قبل التركيب. وتقتصر مسؤوليتنا على تعويض المنتجات المعيبة، دون أي مساهمة في مصاريف الفك وإعادة التركيب.'
    ]),
    careTitle: L('Entretien', 'Maintenance', 'الصيانة'),
    care: L([
      'L’environnement (pollens, poussière, feuilles, végétaux, sels minéraux du sol) donne aux surfaces posées un vieillissement et une patine naturelle.',
      'Pour limiter les efflorescences, la formation de mousses et l’incrustation de taches domestiques et végétales, et faciliter l’entretien : protection avec notre produit <b>TK PROTECT®</b> hydrofuge et oléofuge. Un nettoyage des surfaces est nécessaire avant toute application.',
      'Ne jamais utiliser de nettoyeur haute pression ni de nettoyeur à vapeur.',
      'Pour éviter des taches brunes irréversibles, n’utilisez pas d’engrais ni de produits anti-mousse contenant du sulfate de fer près des dallages.',
      'Utilisation strictement interdite de produits acides ou dérivés, de sels de déverglaçage ou de tout produit qui abîme irrémédiablement la surface.',
      'Avant la pose, stockez toujours les pavés à l’abri des intempéries.',
      'Utilisez de préférence du sable de rivière ou de concassage en lit de pose pour éviter les efflorescences et la carbonatation.'
    ], [
      'The surroundings (pollen, dust, leaves, plants, mineral salts in the soil) give laid surfaces a natural ageing and patina.',
      'To limit efflorescence, moss and domestic or plant stains, and to make cleaning easier, protect the surface with our water- and oil-repellent <b>TK PROTECT®</b>. Clean the surface before any application.',
      'Never use a pressure washer or a steam cleaner.',
      'To avoid permanent brown stains, do not use fertiliser or anti-moss products containing iron sulphate near the paving.',
      'Acids and acid-based products, de-icing salts and anything that permanently damages the surface are strictly forbidden.',
      'Before laying, always store pavers sheltered from the weather.',
      'Use river sand or crushed sand for the bedding layer to avoid efflorescence and carbonation.'
    ], [
      'المحيط (حبوب اللقاح، الغبار، الأوراق، النباتات، الأملاح المعدنية في التربة) يمنح الأسطح المركبة تقادماً وطبقة طبيعية مميزة.',
      'للحد من التزهر وتكوّن الطحالب وترسّب البقع المنزلية والنباتية وتسهيل الصيانة: احموا السطح بمنتجنا <b>TK PROTECT®</b> العازل للماء والزيوت. ويلزم تنظيف السطح قبل أي استعمال له.',
      'لا تستعملوا أبداً منظفاً بالضغط العالي أو بالبخار.',
      'لتفادي البقع البنية الدائمة، لا تستعملوا الأسمدة أو مضادات الطحالب التي تحتوي على كبريتات الحديد قرب البلاط.',
      'يُمنع منعاً باتاً استعمال الأحماض أو مشتقاتها، وأملاح إذابة الجليد، وكل منتج يُتلف السطح بشكل نهائي.',
      'قبل التركيب، خزّنوا البلاطات دائماً بعيداً عن تقلبات الطقس.',
      'يُنصح باستعمال رمل الوادي أو الرمل المكسّر في طبقة التركيب لتفادي التزهر والكربنة.'
    ]),
    steps: [
      { t: L('Préparation du support', 'Preparing the base', 'تحضير الأساس'), img: ['pose-1a', 'pose-1b'], p: L([
        'Pour une pose sur assise souple : décapez la terre végétale sur 15 à 20 cm environ. Donnez au fond de forme la même pente (2 %) que le sol fini.',
        'Posez une nappe géotextile sur le fond de la fondation : elle évite la repousse des mauvaises herbes, stabilise l’ouvrage et assure un meilleur drainage.',
        'Apportez ensuite des matériaux concassés 0/3, compactés à la plaque vibrante.'
      ], [
        'For laying on a flexible bed: strip about 15 to 20 cm of topsoil. Give the sub-base the same slope (2 %) as the finished surface.',
        'Lay a geotextile sheet on the bottom of the foundation: it stops weeds growing back, stabilises the work and improves drainage.',
        'Then spread crushed 0/3 material and compact it with a plate compactor.'
      ], [
        'للتركيب على قاعدة مرنة: أزيلوا التربة النباتية على عمق 15 إلى 20 سم تقريباً. وامنحوا الأساس الميل نفسه (2 %) الذي للأرضية النهائية.',
        'ضعوا غطاءً من النسيج الأرضي (جيوتكستيل) في قاع الأساس: فهو يمنع نمو الأعشاب الضارة ويثبّت المنشأ ويحسّن التصريف.',
        'ثم أضيفوا مواد مكسّرة 0/3 ودكّوها بالصفيحة الهزّازة.'
      ]) },
      { t: L('Lit de pose', 'Bedding layer', 'طبقة التركيب'), img: ['pose-2a', 'pose-2b'], p: L([
        'La pose des pavés doit respecter la norme EN 1338. Préparez le support comme à l’étape 1.',
        'Étalez une couche de sable de rivière lavé, tirée à la règle posée sur des cales de niveau. Après compactage, le lit de pose doit faire 3 à 5 cm d’épaisseur.',
        'Sur un terrain en forte pente, utilisez un lit de pose en sable stabilisé (sable sec et ciment dosé à 150 kg/m³).',
        'Vérifiez la parfaite planéité du support lors de la pose des premiers pavés.'
      ], [
        'Laying must follow the EN 1338 standard. Prepare the base as in step 1.',
        'Spread a layer of washed river sand and screed it with a straight edge on levelling guides. After compaction, the bed must be 3 to 5 cm thick.',
        'On steep ground, use a stabilised sand bed (dry sand mixed with cement at 150 kg/m³).',
        'Check that the base is perfectly flat as you lay the first pavers.'
      ], [
        'يجب أن يحترم تركيب البلاطات المعيار EN 1338. حضّروا الأساس كما في المرحلة 1.',
        'افرشوا طبقة من رمل الوادي المغسول وسوّوها بالمسطرة فوق دعامات التسوية. بعد الدك، يجب أن يتراوح سُمك الطبقة بين 3 و5 سم.',
        'في الأراضي شديدة الانحدار، استعملوا طبقة من الرمل المثبّت (رمل جاف وإسمنت بجرعة 150 كغ/م³).',
        'تحققوا من الاستواء التام للأساس عند تركيب البلاطات الأولى.'
      ]) },
      { t: L('Pose des pavés', 'Laying the pavers', 'تركيب البلاطات'), img: ['pose-3a', 'pose-3b'], p: L([
        'Juste avant la pose, humidifiez le lit de pose sans le saturer.',
        'Posez les pavés à l’avancement, en vous déplaçant sur les pavés déjà posés.',
        'Ajustez la position des pavés avec un maillet en caoutchouc.'
      ], [
        'Just before laying, dampen the bedding layer without soaking it.',
        'Lay the pavers as you go forward, standing on the ones already laid.',
        'Adjust each paver with a rubber mallet.'
      ], [
        'قبل التركيب مباشرة، رطّبوا طبقة التركيب دون إغراقها.',
        'ركّبوا البلاطات تدريجياً متنقلين فوق البلاطات المركبة سلفاً.',
        'اضبطوا موضع البلاطات بمطرقة مطاطية.'
      ]) },
      { t: L('Joints des pavés', 'Jointing', 'الفواصل بين البلاطات'), img: ['pose-4a', 'pose-4b', 'pose-4c'], p: L([
        'Le jointoiement est obligatoire avant la mise en circulation : il stabilise l’ouvrage.',
        'Employez un sable fin, soigneusement balayé dans les interstices entre les pavés. Largeur des joints : environ 3 mm.',
        'Balayez la surface puis compactez-la avec une plaque vibrante dont le sabot est protégé par un feutre.'
      ], [
        'Jointing is compulsory before opening to traffic: it stabilises the surface.',
        'Use fine sand, carefully brushed into the gaps between the pavers. Joint width: about 3 mm.',
        'Sweep the surface, then compact it with a plate compactor whose base is protected by felt.'
      ], [
        'ملء الفواصل إلزامي قبل فتح المنشأ للحركة، فهو يثبّته.',
        'استعملوا رملاً ناعماً تكنسونه بعناية داخل الفراغات بين البلاطات. عرض الفواصل: حوالي 3 مم.',
        'اكنسوا السطح ثم دكّوه بصفيحة هزّازة محمية قاعدتها بلبّاد.'
      ]) }
    ],
    cleanTitle: L('Nettoyage de fin de chantier', 'End-of-works cleaning', 'التنظيف في نهاية الورش'),
    clean: L([
      'Le nettoyage final des pavés doit être fait avec un produit adapté (demandez conseil à votre revendeur).',
      'Ne jamais utiliser de produits acides (chlorhydrique ou autre).'
    ], [
      'Do the final cleaning of the pavers with a suitable product (ask your dealer for advice).',
      'Never use acid products (hydrochloric or other).'
    ], [
      'يجب أن يتم التنظيف النهائي للبلاطات بمنتج ملائم (استشيروا بائعكم).',
      'لا تستعملوا أبداً منتجات حمضية (حمض الكلوريدريك أو غيره).'
    ]),
    safetyTitle: L('Sécurité', 'Safety', 'السلامة'),
    safety: L([
      'Pour découper nos produits, portez un masque et des lunettes qui protègent des poussières.',
      'Pendant la mise en œuvre, les équipements de protection individuelle sont indispensables : chaussures de sécurité et gants.'
    ], [
      'When cutting our products, wear a mask and goggles that protect against dust.',
      'During installation, personal protective equipment is essential: safety shoes and gloves.'
    ], [
      'عند قطع منتجاتنا، ارتدوا كمامة ونظارات تحمي من الغبار.',
      'أثناء الإنجاز، معدات الحماية الفردية ضرورية: أحذية السلامة والقفازات.'
    ]),
    bordTitle: L('Bordures, caniveaux, mobilier urbain', 'Kerbs, channels, street furniture', 'الأرصفة وقنوات التصريف والأثاث الحضري'),
    bordLead: L('Bordures et caniveaux en béton pour la voirie, les trottoirs, les jardins et les lignes de tramway.', 'Concrete kerbs and channels for roads, pavements, gardens and tram lines.', 'أرصفة وقنوات تصريف من الخرسانة للطرق والأرصفة والحدائق وخطوط الترامواي.'),
    mobTitle: L('Mobilier urbain personnalisé', 'Custom street furniture', 'أثاث حضري حسب الطلب'),
    mob: L([
      'Nos espaces urbains sont l’image de nos villes, le reflet de leur dynamisme et de leur qualité de vie. <b>TK BÉTON</b> se veut un acteur de l’harmonisation de nos espaces urbains.',
      'Nous accompagnons nos clients dans leur imagination et la conception d’espaces uniques et originaux, qui s’intègrent parfaitement dans notre environnement urbain.'
    ], [
      'Our public spaces are the image of our cities, a reflection of their energy and quality of life. <b>TK BÉTON</b> aims to help make them harmonious.',
      'We support our clients in imagining and designing unique, original spaces that fit perfectly into the urban setting.'
    ], [
      'فضاءاتنا الحضرية صورة لمدننا، وانعكاس لحيويتها وجودة الحياة فيها. وتطمح <b>تي كي بيتون</b> إلى أن تكون فاعلاً في تناسق فضاءاتنا الحضرية.',
      'نرافق زبناءنا في تخيّل وتصميم فضاءات فريدة ومبتكرة تندمج تماماً في محيطنا الحضري.'
    ]),
    benchTitle: L('Bancs', 'Benches', 'المقاعد'),
    bollardTitle: L('Bornes', 'Bollards', 'الأعمدة الواقية'),
    galleryTitle: L('Réalisations', 'Projects', 'إنجازات'),
    endTitle: L('Retrouvez-nous sur tkbeton.ma', 'Find us at tkbeton.ma', 'تابعونا على tkbeton.ma'),
    end: L('Tous les avis techniques de nos produits ainsi que les fiches produits sont téléchargeables sur notre site internet.', 'All our product technical approvals and product sheets can be downloaded from our website.', 'جميع الآراء التقنية لمنتجاتنا وبطاقات المنتجات قابلة للتحميل من موقعنا الإلكتروني.')
  };

  var KERBS = {
    amer: [
      ['Américaine i1', 'amer-d1', 'amer-r1', [['length', '60 cm'], ['width', '25 cm'], ['height', '18 cm'], ['weight', '75 kg'], ['colour', 'natural'], ['norm', 'NM 10-1-014']]],
      ['Américaine i2', 'amer-d2', 'amer-r2', [['length', '60 cm'], ['width', '30 cm'], ['height', '22 cm'], ['weight', '81 kg'], ['colour', 'natural'], ['norm', 'NM 10-1-014']]]
    ],
    /* name, width, height, kg/piece, pieces/pallet, kg/pallet, B1, B2 */
    t: [
      ['T1', '12 cm', '20 cm', '≈ 55', '24', '≈ 1 350', '14', '10,9'],
      ['T2', '15 cm', '25 cm', '≈ 82', '20', '≈ 1 640', '27,70', '21,80'],
      ['T3', '17 cm', '28 cm', '≈ 105', '20', '≈ 2 100', '40', '31,50'],
      ['T4', '20 cm', '30 cm', '≈ 135', '16', '≈ 2 160', '61,5', '48']
    ],
    p: [
      ['P1', '8 cm', '20 cm', true, '≈ 39', '36', '≈ 1 400', '7,3', '5,7'],
      ['CR1', '8 cm', '20 cm', false, '≈ 39', '36', '≈ 1 400', '7,3', '5,7']
    ],
    tram: [
      ['Trambord 1', '20 cm', '30 cm', '≈ 140', '12', '≈ 1 680', '61,5', '48'],
      ['Trambord XL', '30 cm', '30 cm', '≈ 200', '6', '≈ 1 200', '61,5', '48']
    ],
    cc: [
      ['CC1', 'cc-d1', 'cc-r1', [['length', '100 cm'], ['width', '40 cm'], ['height', '12 cm'], ['weight', '110 kg'], ['colour', 'various']]],
      ['CC2', 'cc-d2', 'cc-r2', [['length', '100 cm'], ['width', '50 cm'], ['height', '14 cm'], ['weight', '140 kg'], ['colour', 'various']]]
    ],
    cs: [
      ['CS1', 'cs-d1', 'cs-r1', [['length', '100 cm'], ['width', '20 cm'], ['height', '12 cm'], ['weight', '55 kg'], ['colour', 'various']]],
      ['CS3', 'cs-d2', 'cs-r2', [['length', '100 cm'], ['width', '25 cm'], ['height', '16,5 cm'], ['weight', '70 kg'], ['colour', 'various']]]
    ]
  };

  /* name, img, length, depth, height, seat thickness, clearance, legs */
  var BENCHES = [
    ['TK 100', 'banc-tk100', '200 cm', '65 cm', '45 cm', '15 cm', '30 cm', ''],
    ['TK 200', 'banc-tk200', '200 cm', '55 cm', '55 cm', '10 cm', '45 cm', ''],
    ['TK 300', 'banc-tk300', '150 cm', '45 cm', '50 cm', '12 cm', '38 cm', 'Ø 30 cm'],
    ['TK 400', 'banc-tk400', '200 cm', '50 cm', '50 cm', '12 cm', '38 cm', '12 cm']
  ];
  /* name, img, [label key, value]… */
  var BOLLARDS = [
    ['TK 001', 'borne-tk001', [['top', '15 cm'], ['base', '20 cm'], ['height', '30 cm']]],
    ['TK 002', 'borne-tk002', [['diameter', '40 cm'], ['height', '35 cm']]],
    ['TK 003', 'borne-tk003', [['diameter', '40 cm'], ['height', '23 cm']]],
    ['TK 004', 'borne-tk004', [['diameter', '40 cm'], ['height', '23 cm'], ['plinth', '12 cm']]],
    ['TK 005', 'borne-tk005', [['height', '80 cm'], ['width', '10 cm'], ['ring', '']]],
    ['TK 006', 'borne-tk006', [['diameter', '40 cm'], ['height', '19 cm'], ['plinth', '12 cm']]]
  ];

  var CONTACTS = {
    usine: { addr: 'Nouvelle Zone Industrielle, Belad Dandoun Sidi Taybi — Kénitra, Maroc', tel: ['+212 5 37 52 25 34'], fax: '+212 5 37 52 25 35', gsm: ['+212 6 61 84 22 00', '+212 6 61 84 16 43'], email: 'tkbeton@gmail.com' },
    siege: { addr: '174 angle Boulevard Zerktouni N°16 — Casablanca, Maroc', tel: ['+212 5 22 20 90 40'], fax: '+212 5 22 20 90 39', gsm: [], email: 'tkbeton@yahoo.fr' }
  };

  /* pixel size of every picture in catalogue/img/, so the page never jumps while pictures load */
  var SIZES = {"agadir-calp":[331,155],"agadir-close":[617,299],"agadir-photo":[354,457],"agadir-render":[428,342],"amer-d1":[274,179],"amer-d2":[274,155],"amer-photo":[1100,495],"amer-r1":[412,269],"amer-r2":[423,269],"banc-tk100-d":[399,270],"banc-tk100":[628,270],"banc-tk200-d":[399,302],"banc-tk200":[628,302],"banc-tk300-d":[399,359],"banc-tk300":[628,359],"banc-tk400-d":[399,367],"banc-tk400":[628,367],"borne-tk001":[479,417],"borne-tk002":[491,417],"borne-tk003":[479,424],"borne-tk004":[491,424],"borne-tk005":[479,530],"borne-tk006":[491,530],"bouregreg-calp":[331,155],"bouregreg-close":[617,299],"bouregreg-photo":[354,457],"bouregreg-render":[428,342],"cc-asm":[685,139],"cc-d1":[388,220],"cc-d2":[388,196],"cc-photo":[1100,495],"cc-r1":[366,212],"cc-r2":[354,228],"chellah-calp":[331,155],"chellah-close":[617,299],"chellah-photo":[354,457],"chellah-render":[428,342],"cover":[957,1093],"cristal-calp":[331,155],"cristal-close":[617,299],"cristal-photo":[354,457],"cristal-render":[428,342],"cs-asm":[685,139],"cs-d1":[377,221],"cs-d2":[377,196],"cs-photo":[1100,495],"cs-r1":[365,179],"cs-r2":[365,270],"double-t-calp":[331,155],"double-t-close":[617,299],"double-t-photo":[354,457],"double-t-render":[428,342],"fes-rustique-calp":[331,155],"fes-rustique-close":[617,299],"fes-rustique-photo":[354,457],"fes-rustique-render":[428,342],"gallery":[1029,1328],"hallala-calp":[331,155],"hallala-close":[617,299],"hallala-photo":[354,457],"hallala-render":[428,342],"kasbah-calp":[331,155],"kasbah-close":[617,299],"kasbah-photo":[354,457],"kasbah-render":[428,342],"kenitra-calp":[331,155],"kenitra-close":[617,299],"kenitra-photo":[354,457],"kenitra-render":[428,342],"lixus-calp":[331,155],"lixus-close":[617,299],"lixus-photo":[354,457],"lixus-render":[428,342],"mehdia-calp":[331,155],"mehdia-close":[617,299],"mehdia-photo":[354,457],"mehdia-render":[428,342],"meknes-calp":[331,155],"meknes-close":[617,299],"meknes-photo":[354,457],"meknes-render":[428,342],"mob-collage":[1100,927],"mob-top":[365,236],"oum-rabie-calp":[331,155],"oum-rabie-close":[617,299],"oum-rabie-photo":[354,457],"oum-rabie-render":[428,342],"p-diag":[411,449],"p-photo1":[542,522],"p-photo2":[594,384],"p-render":[571,327],"pose-1a":[451,299],"pose-1b":[451,294],"pose-2a":[451,305],"pose-2b":[451,305],"pose-3a":[445,302],"pose-3b":[445,294],"pose-4a":[257,237],"pose-4b":[257,157],"pose-4c":[257,212],"pose-clean":[451,311],"pose-ppe":[292,285],"presentation":[1100,416],"sebou-calp":[331,155],"sebou-close":[617,299],"sebou-photo":[354,457],"sebou-render":[428,342],"t-diag":[514,326],"t-photo":[1100,495],"t-render":[491,424],"tanger-med-calp":[331,155],"tanger-med-close":[617,299],"tanger-med-photo":[354,457],"tanger-med-render":[428,342],"tk-port-calp":[331,155],"tk-port-close":[617,299],"tk-port-photo":[354,457],"tk-port-render":[428,342],"tram-diag":[217,440],"tram-photo1":[593,514],"tram-photo2":[543,514],"tram-render":[571,327],"volubilis-calp":[338,154],"volubilis-close":[630,297],"volubilis-photo":[361,454],"volubilis-render":[437,341],"why":[1100,338]};

  window.TK_CAT = { SIZES: SIZES, UI: UI, USE: USE, COLOURS: COLOURS, PAVES: PAVES, TEXT: TEXT, KERBS: KERBS, BENCHES: BENCHES, BOLLARDS: BOLLARDS, CONTACTS: CONTACTS };
})();
