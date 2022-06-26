import { Client, Intents } from "discord.js";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const sunSigns = [
  { name: "aquarius", date: "Jan 20 - Feb 18" },
  { name: "pisces", date: "Feb 19 - Mar 20" },
  { name: "aries", date: "Mar 21 - Apr 19" },
  { name: "taurus", date: "Apr 20 - May 20" },
  { name: "gemini", date: "May 21 - Jun 20" },
  { name: "cancer", date: "Jun 21 - Jul 23" },
  { name: "leo", date: "Jul 24 - Aug 22" },
  { name: "virgo", date: "Aug 23 - Sep 22" },
  { name: "libra", date: "Sep 23 - Oct 22" },
  { name: "scorpio", date: "Oct 23 - Nov 22" },
  { name: "sagittarius", date: "Nov 23 - Dec 21" },
  { name: "capricorn", date: "Dec 22 - Jan 19" },
];

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

const foodForThoughts = [
  "Prasad lena mat bhulna",
  "Sab upar wale ki kripa h",
  "Jug jug jio (sim ki baat nahi kar raha murakh)",
  "Aisi salah aur kahi ni milegi",
  "Ye baat yaad rakhna",
  "Sada Khush raho",
  "Socho beta socho, yahi to sochne wali baat h",
];

async function getQuote() {
  try {
    const res = await fetch("https://zenquotes.io/api/random");
    const data = await res.json();
    return data[0]["q"] + " - " + data[0]["a"];
  } catch (ex) {
    console.log(ex);
    return "some error occured while fetching the quote";
  }
}

const getHoroscope = async (sign) => {
  try {
    const res = await fetch(`https://ohmanda.com/api/horoscope/${sign}`);
    const data = await res.json();
    return `Horoscope for ${data.sign} on ${data.date} :
${data.horoscope}`;
  } catch (ex) {
    console.log(ex);
    return "Dal me kuch kala h. Hum dekhte h";
  }
};

const getDefinition = async (word) => {
  try {
    const url = `https://mashape-community-urban-dictionary.p.rapidapi.com/define?term=${word}`;

    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "7cc314b7fcmsh39f369b80d5a82bp1a6d4ajsn66a281a8d589",
        "X-RapidAPI-Host": "mashape-community-urban-dictionary.p.rapidapi.com",
      },
    };

    const res = await fetch(url, options);
    const data = await res.json();
    if (data.list.length > 0) {
      const firstMatch = data.list[0];

      if (firstMatch.example) {
        return `Defination : ${firstMatch.definition
          .replaceAll("[", "")
          .replaceAll("]", "")}

example: ${firstMatch.example.replaceAll("[", "").replaceAll("]", "")}`;
      } else {
        return `Defination : ${firstMatch.definition
          .replaceAll("[", "")
          .replaceAll("]", "")}`;
      }
    }

    return "Is shabd ka arth to bas sn bata sakti h!";
  } catch (ex) {
    console.log(ex);
    return "Dal me kuch kala h. Hum dekhte h";
  }
};

// const birthdays = new Map();
// birthdays.set("Mohan", { month: "Jan", day: 26 });
// birthdays.set("Mohan 1", { month: "Jun", day: 8 });
// birthdays.set("Mohan 2", { month: "Aug", day: 17 });

const setSchedules = () => {
  // Fetch the general channel that you'll send the birthday message
  // setInterval(() => {
  //   const general = client.channels.cache.get("920875882086797377");

  //   console.log(general);
  //   // For every birthday
  //   birthdays.forEach((birthday, user) => {
  //     // Define the user object of the user Id

  //     console.log(Date.now);
  //     // Create a cron schedule
  //     // cron.schedule(`* * * ${birthday.day} ${birthday.month} *`, () => {
  //     //   general.send(`Today's ${user.toString()} birthday, congratulations!`);
  //     // });
  //   });
  // }, 1000 * 60);
  console.log("the bot is ready");
};

const getJoke = async () => {
  try {
    const res = await fetch("https://icanhazdadjoke.com/", {
      method: "GET",
      headers: { Accept: "application/json" },
    });
    const { joke } = await res.json();
    return joke;
  } catch (ex) {
    console.log(ex);
    return "Maaf karna, joke ni mila";
  }
};

client.on("ready", setSchedules);

client.on("messageCreate", async (msg) => {
  if (msg.author.bot) return;
  if (msg.content === "&status") {
    msg.reply("Bhramand Nayak sadha tumharey sat ha");
  }

  if (msg.content === "&inspire") {
    console.log("test");
    const quote = await getQuote();
    const thought =
      foodForThoughts[Math.floor(Math.random() * foodForThoughts.length)];
    msg.channel.send(`${quote}

${thought}, ${msg.author.username}!`);
  }

  if (msg.content.toLowerCase().startsWith("&define")) {
    const word = msg.content.split(" ")[1].toLowerCase();
    const definition = await getDefinition(word);
    if (definition) {
      msg.channel.send(definition);
    } else {
      msg.channel.send("Kuch to gadbad h daya!");
    }
  }

  if (msg.content.toLowerCase().startsWith("&remind")) {
    let message = msg;
    try {
      // Variables
      let returntime;
      msg = msg.content.split(" ");
      console.log(
        "Message recieved from " +
          message.author.id +
          " at " +
          Date.now().toString()
      );

      // Sets the userid for the recipiant
      const reciever = msg[1];
      const userObj = client.users.cache.get(
        msg[1].replace("<@", "").slice(0, -1)
      );

      const timemeasure = msg[3];
      returntime = msg[2];

      // Based off the delimiter, sets the time
      switch (timemeasure) {
        case "s":
          returntime = returntime * 1000;
          break;

        case "m":
          returntime = returntime * 1000 * 60;
          break;

        case "h":
          returntime = returntime * 1000 * 60 * 60;
          break;

        case "d":
          returntime = returntime * 1000 * 60 * 60 * 24;
          break;

        default:
          returntime = returntime * 1000;
          break;
      }

      console.log("return time->", returntime);

      setTimeout(function () {
        // Removes the first few array items
        const [_, __, ___, ____, ...remaing] = msg;

        const content = remaing.join().replaceAll(",", " ");
        if (userObj) {
          message.channel.send(`<@${userObj.id}> ${content}`);
          console.log(
            "Message sent to " +
              userObj.username +
              " at " +
              Date.now().toString()
          );
        } else {
          message.channel.send(`${reciever} ${content}`);
          console.log(
            "Message sent to " + reciever + " at " + Date.now().toString()
          );
        }

        //Code
      }, returntime);
    } catch (e) {
      message.reply(
        "An error has occured, please make sure the command has a time delimiter and message"
      );
      console.error(e.toString());
    }
  } else if (msg.content.toLowerCase().startsWith("&horoscope")) {
    const sign = msg.content.split(" ")[1].toLowerCase();

    const allSigns = sunSigns.map((x) => x.name);
    if (allSigns.includes(sign)) {
      const horoscope = await getHoroscope(sign);
      msg.channel.send(horoscope);
    } else {
      msg.channel.send("Aisa koi sign ni hota, murakh");
    }
  }

  if (msg.content === "&signs") {
    const signs = sunSigns.reverse().reduce(
      (prev, curr) => `- ${curr.name} : ${curr.date}
${prev}`,
      ""
    );

    console.log(signs);
    msg.channel.send(signs);
  }

  if (msg.content === "&halp") {
    const halp = `
Bhramand Nayak tumhari sahayta zarur karega
&status - to know the status of the bot
&remind - set a reminder. Use the format &remind <@person> <number> <duration> <reminder message>. for setting a duration, use s for second, m for minute, h for hour and d for days. Sample - &remind @mohan 1 s you forgot to write help command !
&horoscope <sun sign> - to get todays horoscope for the given sun sign.
&signs - to get the list of sun signs and the dates for the respective signs. You can find which sign you belong to using this command
&define <word> - use this to get the meaning of the word.
    `;

    msg.channel.send(halp);
  }

  if (msg.content === "&joke") {
    const joke = await getJoke();
    msg.channel.send(joke);
  }
});

console.log(process.env.TOKEN);
client.login(process.env.TOKEN);
