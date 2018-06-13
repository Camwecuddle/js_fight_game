class Fighter {
    constructor(name, health, strength, quickness) {
        this.name = name;
        this.health = health;
        this.strength = strength;
        this.quickness = quickness;
    }
}

var player1 = null;

function GenerateP1() {
    console.log(player1 == null);
    if(player1 == null) {
        var name = randomName();
        var health = randomStat(1);
        console.log("Health: " + health);
        var strength = randomStat(health / 2);
        console.log("Strength: " + strength);
        var quickness = randomStat((health + strength) / 2);
        console.log("Quickness: " + quickness);

        player1 = new Fighter(name, health, strength, quickness);
    }
    displayP1();
}

var player2 = null;

function displayP1() {
    $("#name1").html(player1.name);
    $("#health1").animate({
        width: player1.health + "%"
    });
    $("#strength1").animate({
        width: player1.strength + "%"
    });
    $("#quickness1").animate({
        width: player1.quickness + "%"
    });
}

function randomStat(limiter) { //the limiter puts a cap on the strength based on the health and the speed based on health + strength
    var stat = Math.floor(Math.random() * (100 - limiter));
    console.log("Limiter: " + limiter)
    return stat;
}







function randomName() {
    var name = capFirst(randomEl(adjectives)) + ' ' + capFirst(randomEl(nouns));
    return name;
}

function randomEl(list) {
    var i = Math.floor(Math.random() * list.length);
    return list[i];
}

function capFirst(str) {
    var firstChar = str.charCodeAt(0);
    firstChar = String.fromCharCode(firstChar - 32);
    return (firstChar + str.substring(1));
}

var adjectives = ["adamant", "adroit", "amatory", "animistic", "antic", "arcadian", "baleful", "bellicose", "bilious", "boorish", "calamitous", "caustic", "cerulean", "comely", "concomitant", "contumacious", "corpulent", "crapulous", "defamatory", "didactic", "dilatory", "dowdy", "efficacious", "effulgent", "egregious", "endemic", "equanimous", "execrable", "fastidious", "feckless", "fecund", "friable", "fulsome", "garrulous", "guileless", "gustatory", "heuristic", "histrionic", "hubristic", "incendiary", "insidious", "insolent", "intransigent", "inveterate", "invidious", "irksome", "jejune", "jocular", "judicious", "lachrymose", "limpid", "loquacious", "luminous", "mannered", "mendacious", "meretricious", "minatory", "mordant", "munificent", "nefarious", "noxious", "obtuse", "parsimonious", "pendulous", "pernicious", "pervasive", "petulant", "platitudinous", "precipitate", "propitious", "puckish", "querulous", "quiescent", "rebarbative", "recalcitant", "redolent", "rhadamanthine", "risible", "ruminative", "sagacious", "salubrious", "sartorial", "sclerotic", "serpentine", "spasmodic", "strident", "taciturn", "tenacious", "tremulous", "trenchant", "turbulent", "turgid", "ubiquitous", "uxorious", "verdant", "voluble", "voracious", "wheedling", "withering", "zealous"];
var nouns = ["ninja", "chair", "pancake", "statue", "unicorn", "rainbows", "laser", "senor", "bunny", "captain", "nibblets", "cupcake", "carrot", "gnomes", "glitter", "potato", "salad", "toejam", "curtains", "beets", "toilet", "exorcism", "stick figures", "mermaid eggs", "sea barnacles", "dragons", "jellybeans", "snakes", "dolls", "bushes", "cookies", "apples", "ice cream", "ukulele", "kazoo", "banjo", "opera singer", "circus", "trampoline", "carousel", "carnival", "locomotive", "hot air balloon", "praying mantis", "animator", "artisan", "artist", "colorist", "inker", "coppersmith", "director", "designer", "flatter", "stylist", "leadman", "limner", "make-up artist", "model", "musician", "penciller", "producer", "scenographer", "set decorator", "silversmith", "teacher", "auto mechanic", "beader", "bobbin boy", "clerk of the chapel", "filling station attendant", "foreman", "maintenance engineering", "mechanic", "miller", "moldmaker", "panel beater", "patternmaker", "plant operator", "plumber", "sawfiler", "shop foreman", "soaper", "stationary engineer", "wheelwright", "woodworkers"];