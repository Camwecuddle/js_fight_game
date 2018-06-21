var idling = false;

class Fighter {
    constructor(name, health, strength, quickness, luck, vamp, crit) {
        this.name = name;
        this.health = health; 
        this.strength = strength; //Damage per turn
        this.quickness = quickness; //Decides first attack
        this.luck = luck; //How often vamp and crit take effect
        this.vamp = vamp; //What percent of health they steal
        this.crit = crit; //Damage multiplyer
        this.level = 0; 
        this.startHealth = health;
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
        $("#luck1").animate({
            width: "0%"
        });
        $("#vamp1").animate({
            width: "0%"
        });
        $("#crit1").animate({
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
        $("#luck2").animate({
            width: "0%"
        });
        $("#vamp2").animate({
            width: "0%"
        });
        $("#crit2").animate({
            width: "0%"
        });
    }
}

var player1 = null;
var player2 = null;

function generateP1() { //create a new fighter in the player1 position
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
        var luck = randomStat((health + strength) / 2)/2;
        console.log("Luck: " + luck);
        var vamp = randomStat((health + strength) / 2);
        console.log("Vamp: " + vamp);
        var crit = randomStat((health + strength) / 2);
        console.log("Crit: " + crit);

        player1 = new Fighter(name, health, strength, quickness, luck, vamp, crit);
    }
    displayP1();
}

function displayP1() {
    $("#name1").html(player1.name + " lvl." + player1.level);
    $("#health1").animate({
        width: player1.health + "%"
    });
    $("#strength1").animate({
        width: player1.strength + "%"
    });
    $("#quickness1").animate({
        width: player1.quickness + "%"
    });
    $("#luck1").animate({
        width: player1.luck + "%"
    });
    $("#vamp1").animate({
        width: player1.vamp + "%"
    });
    $("#crit1").animate({
        width: player1.crit + "%"
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
        var luck = randomStat((health + strength) / 4);
        console.log("Luck: " + luck);
        var vamp = randomStat((health + strength) / 2);
        console.log("Vamp: " + vamp);
        var crit = randomStat((health + strength) / 2);
        console.log("Crit: " + crit);

        player2 = new Fighter(name, health, strength, quickness, luck, vamp, crit);
    }
    displayP2();
}

function displayP2() {
    $("#name2").html(player2.name + " lvl." + player2.level);
    $("#health2").animate({
        width: player2.health + "%"
    });
    $("#strength2").animate({
        width: player2.strength + "%"
    });
    $("#quickness2").animate({
        width: player2.quickness + "%"
    });
    $("#luck2").animate({
        width: player2.luck + "%"
    });
    $("#vamp2").animate({
        width: player2.vamp + "%"
    });
    $("#crit2").animate({
        width: player2.crit + "%"
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
            var willCrit = p1.luck > Math.floor(Math.random() * 100);
            var willVamp = p1.luck > Math.floor(Math.random() * 100);
            
            if(willCrit) p2.health -= (p1.strength / 5); //player one crit attack
            else p2.health -= (p1.strength / 10); //player one attack

            if(willVamp) p1.health += (p1.vamp / 5); //player one life steal
            else {}
            
            $("#health2").animate({
                width: p2.health + "%"
            });
            $("#health1").animate({
                width: p1.health + "%"
            });

            if (p2.health <= 0) {
                setTimeout(endFight, 15000, p1);
                return;
            }
            
            var willCrit = p2.luck > Math.floor(Math.random() * 100);
            var willVamp = p2.luck > Math.floor(Math.random() * 100);
            
            if(willCrit) p1.health -= (p2.strength / 5); //player one crit attack
            else p1.health -= (p2.strength / 10); //player one attack

            if(willVamp) p2.health += (p2.vamp / 5); //player one life steal
            else {}

            $("#health1").animate({
                width: p1.health + "%"
            });
            $("#health2").animate({
                width: p2.health + "%"
            });

            if (p1.health <= 0) {
                setTimeout(endFight, 15000, p2);
                return;
            }
        } else {
            var willCrit = p2.luck > Math.floor(Math.random() * 100);
            var willVamp = p2.luck > Math.floor(Math.random() * 100);
            
            if(willCrit) p1.health -= (p2.strength / 5); //player one crit attack
            else p1.health -= (p2.strength / 10); //player one attack

            if(willVamp) p2.health += (p2.vamp / 5); //player one life steal
            else {}

            $("#health1").animate({
                width: p1.health + "%"
            });
            $("#health2").animate({
                width: p2.health + "%"
            });

            if (p1.health <= 0) {
                setTimeout(endFight, 15000, p2);
                return;
            }
            
            willCrit = p1.luck > Math.floor(Math.random() * 100);
            willVamp = p1.luck > Math.floor(Math.random() * 100);
            
            if(willCrit) p2.health -= (p1.strength / 5); //player one crit attack
            else p2.health -= (p1.strength / 10); //player one attack

            if(willVamp) p1.health += (p1.vamp / 5); //player one life steal
            else {}

            $("#health2").animate({
                width: p2.health + "%"
            });
            $("#health1").animate({
                width: p1.health + "%"
            });

            if (p2.health <= 0) {
                setTimeout(endFight, 15000, p1);
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
        winner.level++;
        displayP1();
        terminate(player2);
    } else {
        player1 = null;
        reset(winner);
        winner.level++;
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