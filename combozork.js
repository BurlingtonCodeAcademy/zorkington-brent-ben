const readline = require('readline');
const { Console } = require('console');
const { ENETUNREACH } = require('constants');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
    return new Promise((resolve, reject) => {
        readlineInterface.question(questionText, resolve);
    });
}
let status = 5 // set for sobriety
let inventory = ["cellphone", "lighter", "flashlight"]; //starting inventory
function displayInventory() {
    inventory.forEach(article => console.log(article)) // to diplay items in inventory array
}
class Item {
    constructor(name, takeable, useable, content) { // possibilities for each item in inventory
        this.name = name
        this.takeable = takeable
        this.useable = useable
        this.content = content
    }

    take() {
        if (this.takeable) {
            inventory.push(this.name); // when used puts takeable items into inventory
            console.log("You picked up " + this.name)
        } else {
            console.log("This cannot be moved!")
        }
    }
    use() { // if useable lets articles in inventory be used
        if (this.useable) {
            if (inventory.includes(this.name)) {
                return "used"
            }
            else {
                console.log("you do not have this item in your inventory")
            }
        } else {
            return "You cannot use this item now"
        }
    }
    drop() {
        inventory.filter(article => this.name !== article)
        console.log("You have dropped the " + this.name)


    }

} // all items
let key = new Item("key", true, true, "you now have a key")
let flashlight = new Item("flashlight", true, true, "The flashlight lights up your surroundings ")
let cellphone = new Item("cellphone", true, true, "You take your phone out of your pocket. \nYou have no signal but your flashlight works")
let note = new Item("note", false, false, 'The note says "Come on in! The code for the door is 8675309"')
let beer = new Item("beer", true, true, "You crack open the ice cold beer")
let truly = new Item("truly", true, true, "you know better. Put the truly down \nimmediately before someone sees you")
console.log("You’re on your way to a party in the middle of nowhere. \nYou entered the address into maps but \nyou lose cell service after you make your \n10th turn on some desolate dirt road.  \nTen minutes later you’re about to turn around \nwhen the dashboard lights up like a Christmas tree. \nYour car sputters and dies. \nYou turn the key again and again but no dice. \nYou flick on your high beams to try to \nsee if anything is up ahead. \nYou think you can make out the silhouette \nof barn further down the road. \nIt’s the first sign of civilization you’ve \nseen in the last 15 minutes. \nIt’s a very long walk back to the last \nhouse you passed, its pitch black and \nits starting to get cold. ")
console.log("You can go to the barn or walk back the way you came")
const opening = "What would you like to do? \n>_"
play();

function cleanUp(words) {
    return words.toLowerCase().trim()
}

async function play() {


    const opening = "What would you like to do? \n>_"
    let answer = await ask(opening)
    answer = cleanUp(answer)

    if (answer.includes("back")) {
        console.log("you walk for 3 hours in the \nfreezing cold but fianlly reach a \npaved road where you get picked hitchiking ")
        process.exit()
    }
    if (answer.includes('barn')) {
        console.log("The barn sits at the top of a long driveway. \nIt is old and falling apart. \nDown the driveway you see a flcikering \nlight in a window. You walk toward the light \nand eventually arrive at the house. \nYou are standing on a large covered porch. \nThere is a door with a secuirty code lock \ndirectly in front of you. \nThere is a note taped to the door. \nIf you want to pick up items enter the word take. \nTo use an item enter use \nand drop to drop an item. \nIf uou ever want to see what items you have\nin your possesion just type check pockets.\nGood luck! ")
        play2()
    }
    else if (answer.includes("inventory")) {
        displayInventory()
    }

    else {
        console.log(`I do not understand '${answer}' please try again`)
        play()
    }

}

async function play2() {
    let answer = await ask(opening)
    answer = answer.toLowerCase().trim()
    if (answer.includes("read")) {
        console.log(note.content)
    }
    else if (answer.includes("take")) {
        note.take()
    }
    else if (answer.includes("open") || answer.includes("door")) {
        console.log("The door is locked. You need a code")
        play2()
    }
    else if (answer.includes("enter") || answer.includes("code")) {
        answer = await ask("Please enter the door code now\n")
        if (answer === "8675309") { // add console log for door opening and an else
            console.log("you have enetered the house. \nyou are in a pitch black, windowless room. \nBehind you the door clicks shut erasing \nthe sliver of moonlight you had. \nYou try to open the door to let in \nsome light but it is locked. ")
            play3()
        }
        if (answer !== "8675309")
            console.log(`${answer} is the wrong code. Try again`)
        play2()
    }
    else if (answer.includes("pockets")) {
        displayInventory()
    }
    else {
        console.log(`I do not understand '${answer}' please try again`)
        play2()
    }

    play2()

}

async function play3() {
    let answer = await ask("you check your pockets for a light source and you luckily brought your cellphone. \nWhat would you like to do?")
    if (answer.includes("cellphone") || answer.includes("phone") || answer.includes("flashlight")) {
        console.log(cellphone.content)
        cellphone.use()

        console.log(flashlight.content + "There are two more doors in the room. \nOne door is on the north wall and the other is on the west.")
        play4()

    }
    else if (answer.includes("pockets")) {
        displayInventory()
    }
    else {
        console.log(`${answer} wont work. It is just too dark`)
        play3()
    }



}


async function play4() {
    let answer = await ask("what door would you like to open?")
    if (answer.includes("north")) {
        console.log("You have found the party! \nThere is a cooler full of beer to your \nleft with a few Truly's scattered throughout as well")
        play5()
    }
    else if (answer.includes("west")) {
        console.log("you are in a closet. \nBehind all the clothes in the closet \nyou can see a ray of light and you hear \na faint whirring noise. You need to move \nthe clothes to investigate further") //add to this
        play6()
    }
    else if (answer.includes("pockets")) {
        displayInventory()
    }
    else {
        console.log("you cannot do that right now")
        play4()
    }
}
async function play5() {
    let answer = await ask(opening)
    if (answer.includes("beer")) {
        console.log("Beer in hand you check out the scene. \nYou spot your friends sitting around a table. \nCongratulations you made it to the party.")
        beer.take()


    }
    else if (answer.includes("use")) {
        if (beer.use() === "used") {
            status = status - 1
            if (status < 1) {
                console.log("you are too drunk to move. you sit down and pass out")
                process.exit()
            }

        }

    }

    else if (answer.includes("truly")) {
        truly.take()
        while (true) {
            console.log("A Truly is now in your inventory. Drop it immediately")
            answer = await ask(opening)
            if (answer.includes("truly" || answer.includes("drop") || answer.includes("down"))) {
                truly.drop()
                break
            }
            else {
                console.log("You cannot walk round with that")
            }
        }
    }
    else if (answer.includes("exit")) {
        console.log("you have returned to the foyer")
        play4()
    }
    else if (answer.includes("pockets")) {
        displayInventory()
    }
    else {
        console.log("you cannot do that right now")
    }
    play5()
}
async function play6() {
    let answer = await ask(opening)
    if (answer.includes("clothes")) {
        console.log("you move the clothes aside \nand see a small door in the \nback of the closet. \nyou see a key resting on the \nframe of the small door")
    }
    else if (answer.includes("take")) {
        key.take()
    }
    else if (answer.includes("use")) {
        if (key.use() === "used") {
            console.log('You open the small door and see a cart.\nThe words "This is it" are spray painted on the wall. \nYou get in the cart and it begins to lower \nyou down a makeshift elevator shaft. \nWhen you get to the bottom of the elevator shaft \nthe cart starts rolling on rollercoaster tracks. \nThose tracks wind along until you reach another elevator shaft\nsteam hisses out of the shaft and an ominous \n"Keep out" sets in a moment of panic.\nDown the next elevator you go until you \nfinally reach the bottom. The cart stops and you get out.\nYou can hear rustling. you look around the corner \nand see a long haired man sitting in front of\na large collection of computers and some sort of lab equipment.')
            play7()
        }


    }
    else if (answer.includes("pockets")) {
        displayInventory()
    }
    else {
        console.log("you cannot do that right now")
    }
    play6()
}

async function play7() {
    let answer = await ask("Who is this man?")
    if (answer.includes("Lazlo Hollyfeld") || answer.includes("Lazlo")) {
        console.log("Congratulations! You have won the game and soon the lottery as well")
        process.exit()
    }
    else if (answer.includes("pockets")) {
        displayInventory()
    }

    else {
        console.log(`${answer} is incorrect. I'm dissapointed in you. Try agian`)
        play7()
    }
}
