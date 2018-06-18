var idling = false;

class Fighter {
    constructor(name, health, strength, quickness) {
        this.name = name;
        this.health = health;
        this.strength = strength;
        this.quickness = quickness;
        this.startHealth = health;
        this.startStrength = strength;
        this.startQuickness = quickness;
    }
}

function reset(fighter) {
    fighter.health = fighter.startHealth;
}

function terminate(fighter) {
    if (fighter === player1) {
        $("#name1").html("");
        $("#health1").animate({
            width: "0%"
        });
        $("#strength1").animate({
            width: "0%"
        });
        $("#quickness1").animate({
            width: "0%"
        });
    } else {
        $("#name2").html("");
        $("#health2").animate({
            width: "0%"
        });
        $("#strength2").animate({
            width: "0%"
        });
        $("#quickness2").animate({
            width: "0%"
        });
    }
}

var player1 = null;
var player2 = null;

function generateP1() {
    console.log(player1 == null);
    if (player1 == null) {
        var name = randomName();
        console.log(name);
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

function generateP2() {
    console.log(player2 == null);
    if (player2 == null) {
        var name = randomName();
        console.log(name);
        var health = randomStat(1);
        console.log("Health: " + health);
        var strength = randomStat(health / 2);
        console.log("Strength: " + strength);
        var quickness = randomStat((health + strength) / 2);
        console.log("Quickness: " + quickness);

        player2 = new Fighter(name, health, strength, quickness);
    }
    displayP2();
}

function displayP2() {
    $("#name2").html(player2.name);
    $("#health2").animate({
        width: player2.health + "%"
    });
    $("#strength2").animate({
        width: player2.strength + "%"
    });
    $("#quickness2").animate({
        width: player2.quickness + "%"
    });
}

function randomStat(limiter) { //the limiter puts a cap on the strength based on the health and the speed based on health + strength
    var stat = Math.floor(Math.random() * (100 - limiter));
    console.log("Limiter: " + limiter)
    return stat;
}

function fight() { //The two players fight and the health bars drop over time at the end, the loser is set to null
    if (!idling) {
        if (player1 == null || player2 == null) {} else {
            turn(player1, player2);
        }
    }
}

function idle() {
    idling = true;
    generateP1();
    generateP2();
    if (player1 == null || player2 == null) {} else {
        turn(player1, player2);
    }
}

function turn(p1, p2) { //one turn of the fight
    while (true) {

        if (p1.quickness > p2.quickness) {
            p2.health -= (p1.strength / 10); //player one attack
            $("#health2").animate({
                width: p2.health + "%"
            });
            if (p2.health <= 0) {
                setTimeout(endFight, 10000, p1);
                return;
            }
            p1.health -= (p2.strength / 10); //player two attack
            $("#health1").animate({
                width: p1.health + "%"
            });
            if (p1.health <= 0) {
                setTimeout(endFight, 10000, p2);
                return;
            }
        } else {
            p1.health -= (p2.strength / 10); //player one attack
            $("#health1").animate({
                width: p1.health + "%"
            });
            if (p1.health <= 0) {
                setTimeout(endFight, 10000, p2);
                return;
            }
            p2.health -= (p1.strength / 10); //player two attack
            $("#health2").animate({
                width: p2.health + "%"
            });
            if (p2.health <= 0) {
                setTimeout(endFight, 10000, p1);
                return;
            }
        }
    }
}

function endFight(winner) {
    console.log("endFight");
    if (winner === player1) {
        player2 = null;
        reset(winner);
        displayP1();
        terminate(player2);
    } else {
        player1 = null;
        reset(winner);
        displayP2();
        terminate(player1);
    }
    if (idling) idle();
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