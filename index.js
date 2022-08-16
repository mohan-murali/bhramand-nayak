import { Client, Intents, MessageEmbed } from "discord.js";
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

const monkaImages = [
  "https://c.tenor.com/6QKSWGbQV74AAAAC/monka-extreme.gif",
  "https://c.tenor.com/7caHI0tFuTsAAAAM/pepe-sweat.gif",
  "https://c.tenor.com/318_LsuAJtgAAAAC/monkax-feels-love-man.gif",
  "https://c.tenor.com/X585bCgHw9MAAAAC/monka-scooter.gif",
  "https://c.tenor.com/0ejkAIfiAb0AAAAM/pepedao-pepe.gif",
  "https://c.tenor.com/L02qxaSU5SQAAAAM/pepe.gif",
  "https://c.tenor.com/6pS6W91lRMAAAAAM/monka-walk-away-monka.gif",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb1WeQlTbGvpqFn8mqok6bNfdPF6zmyHE5eQ&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNNpKBnKVIcmMP5pGDjkxvDUmzfWfEg9HkWJuEYWTrsG6G3FDNKf-hyTX_Tgpx0dgUkBE&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgzpoOQCmSJpMOftNuEqH7sN71ZU1BXP3MtfCyAZb-fXJ4bzvqW0vw3kXVO4E5i_PwTng&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKXJcJ0sv6mNgzVVQ0yJTMPGCdxT4bNG3TKkqhQWble-B8KRXhxsWrJzz2v6CeoMxH8n4&usqp=CAU",
  "https://cdn.dicionariopopular.com/imagens/monkamega.jpg",
  "https://cdn.vox-cdn.com/thumbor/rxRdQlRmEhXPGiOTAoZeiMhluYM=/1400x0/filters:no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/10838149/poggers.jpg",
  "https://ih1.redbubble.net/image.832742888.0963/st,small,507x507-pad,600x600,f8f8f8.u4.jpg",
  "https://s3.getstickerpack.com/storage/uploads/sticker-pack/peepo-frog-emotes-4/tray.png",
  "https://c.tenor.com/8kIoZ3dNzjcAAAAC/peepo-peepoblush.gif",
  "https://c.tenor.com/JyrN6lMcJw8AAAAM/peepo-giggle.gif",
  "https://i.pinimg.com/originals/e9/0c/b2/e90cb24349d868f9449d5b7ff0a0ccb8.gif",
  "https://i.pinimg.com/originals/5d/ee/91/5dee91700de2b898f61260bea7322a5c.gif",
  "https://i.pinimg.com/originals/ac/2a/ab/ac2aab4b58cd4472edcfd62bd4618177.gif",
  "https://i.pinimg.com/originals/e5/8e/1f/e58e1f9a7444cdf86a45525b2d1e48a8.gif",
  "https://c.tenor.com/5aF7np_zPEgAAAAM/pepe-why-pepe-the-frog.gif",
  "https://www.icegif.com/wp-content/uploads/2021/10/icegif-1024.gif",
  "https://i.pinimg.com/originals/24/80/3c/24803c9ff9de2275fde3bce8dff6f7a0.gif",
  "https://i.kym-cdn.com/photos/images/original/000/890/568/082.gif",
  "https://i.kym-cdn.com/photos/images/masonry/001/840/121/575.gif",
  "https://i.kym-cdn.com/photos/images/newsfeed/002/057/990/a33.gif",
  "https://c.tenor.com/OMmVm87NqZgAAAAM/wine-wine-time.gif",
  "https://i.kym-cdn.com/photos/images/facebook/001/865/673/cc9.png",
  "https://i.kym-cdn.com/photos/images/original/001/865/681/aac.png",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6V8XjXFh3E-EC6lQjnGzFl0b9DT4qKEvxAavyCv_1aj0bx7I7tSKPTzhnJtJcTrxLQWQ&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9o_uiGDt_R_JoOneJzdKcABQFfvcItDSvEUcBy1p0MnoKxiuXfacGUosueGcadCqFCSM&usqp=CAU",
  "https://www.streamscheme.com/wp-content/uploads/2020/04/pepega.png.webp",
  "https://c.tenor.com/64w8YOZ2Mm0AAAAM/pepe-pepeexit.gif",
  "https://i.kym-cdn.com/photos/images/newsfeed/000/977/021/a14.jpg",
  "https://c.tenor.com/7YSe06ToFRkAAAAC/eyes.gif",
  "https://c.tenor.com/omEtcsBCRWQAAAAM/crazy-eyes-frog.gif",
];

const wait = (time) =>
  new Promise((res) => {
    setTimeout(() => {
      res();
    }, time);
  });

const getQuote = async () => {
  try {
    const res = await fetch("https://zenquotes.io/api/random");
    const data = await res.json();
    return data[0]["q"] + " - " + data[0]["a"];
  } catch (ex) {
    console.log(ex);
    return "some error occured while fetching the quote";
  }
};

const getDoggo = async () => {
  try {
    const res = await fetch("https://dog.ceo/api/breeds/image/random");
    const data = await res.json();
    return data.message;
  } catch (ex) {
    console.log(ex);
    return "some error occured while fetching the doggo";
  }
};

const getKitty = async () => {
  try {
    const res = await fetch(
      "https://api.thecatapi.com/v1/images/search?limit=1&size=full"
    );
    const data = await res.json();
    return data[0].url;
  } catch (ex) {
    console.log(ex);
    return "some error occured while fetching the kitty";
  }
};

const getHoroscope = async (sign) => {
  try {
    const res = await fetch(`https://discordtest.mohan28.repl.co/day/${sign}`);
    const data = await res.json();
    console.log(data);
    return `Horoscope for ${sign} on ${data.data}`;
  } catch (ex) {
    console.log(ex);
    return "Dal me kuch kala h. Hum dekhte h";
  }
};

const getHoroscopeTomorrow = async (sign) => {
  try {
    const res = await fetch(
      `https://discordtest.mohan28.repl.co/tomorrow/${sign}`
    );
    const data = await res.json();
    console.log(data);
    return `Horoscope for ${sign} on ${data.data}`;
  } catch (ex) {
    console.log(ex);
    return "Dal me kuch kala h. Hum dekhte h";
  }
};

const getHoroscopeYesterday = async (sign) => {
  try {
    const res = await fetch(
      `https://discordtest.mohan28.repl.co/yesterday/${sign}`
    );
    const data = await res.json();
    console.log(data);
    return `Horoscope for ${sign} on ${data.data}`;
  } catch (ex) {
    console.log(ex);
    return "Dal me kuch kala h. Hum dekhte h";
  }
};

const getWeeklyHoroscope = async (sign) => {
  try {
    const res = await fetch(`https://discordtest.mohan28.repl.co/week/${sign}`);
    const data = await res.json();
    return data.data;
  } catch (ex) {
    console.log(ex);
    return "Dal me kuch kala h. Hum dekhte h";
  }
};

const getMonthlyHoroscope = async (sign) => {
  try {
    const res = await fetch(
      `https://discordtest.mohan28.repl.co/month/${sign}`
    );
    const data = await res.json();
    return data.data;
  } catch (ex) {
    console.log(ex);
    return "Dal me kuch kala h. Hum dekhte h";
  }
};

const getBookDetail = async (name) => {
  try {
    const res = await fetch(
      `https://discordtest.mohan28.repl.co/book?name=${name}`
    );
    const data = await res.json();
    return data.data;
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
    const quote = await getQuote();
    const thought =
      foodForThoughts[Math.floor(Math.random() * foodForThoughts.length)];
    msg.channel.send(`${quote}

${thought}, ${msg.author.username}!`);
  }

  if (msg.content === "&monka") {
    const monka = monkaImages[Math.floor(Math.random() * monkaImages.length)];
    msg.channel.send(monka);
  }

  if (msg.content === "&doggo") {
    const dog = await getDoggo();
    msg.channel.send(dog);
  }

  if (msg.content === "&kitty") {
    const cat = await getKitty();
    msg.channel.send(cat);
  }

  if (msg.content === "&emoji") {
    console.log("this command is hit");
    const message = await msg.channel.send(":smile:");
    const time = 1000;
    // const promiseA = new Promise((res) => res());
    // promiseA
    //   .then(
    //     setTimeout(() => {
    //       console.log("Delayed for 5 second.");
    //       message.edit(":grin:");
    //     }, 5000)
    //   )
    //   .then(() => {
    //     setTimeout(() => {
    //       console.log("delayed after 5 seconds");
    //       message.edit(":smile:");
    //     }, 5000);
    //   });
    let i = 0;
    const interval = setInterval(async () => {
      i++;
      if (i > 3) {
        clearInterval(interval);
      }
      await wait(time);
      message.edit(":grin:");
      await wait(time);
      message.edit(":laughing:");
      await wait(time);
      message.edit(":smile:");
    }, time);
    // let i = 0;
    // const interval = setInterval(() => {
    //   i++;
    //   if (i > 3) {
    //     clearInterval(interval);
    //   }
    //   setTimeout(() => {
    //     message.edit(":grin:");
    //     setTimeout(() => {
    //       message.edit(":laughing:");
    //       setTimeout(() => {
    //         message.edit(":smile:");
    //       }, time);
    //     }, time);
    //   }, time);
    // }, time);
  }

  if (msg.content === "&blink") {
    const message = await msg.channel.send(":smiley:");
    const time = 500;
    let i = 0;
    const interval = setInterval(async () => {
      i++;
      if (i > 3) {
        clearInterval(interval);
      }
      await wait(time);
      message.edit(":laughing:");
      await wait(time);
      message.edit(":smiley:");
    }, time);
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

  if (msg.content.toLowerCase().startsWith("&book")) {
    try {
      const [_, ...remaining] = msg.content.split(" ");
      const name = remaining.join("+");
      const bookDetail = await getBookDetail(name);
      console.log(bookDetail);
      if (bookDetail !== "Result not found") {
        const exampleEmbed = new MessageEmbed()
          .setColor("#0099ff")
          .setTitle(bookDetail.title)
          .setAuthor({ name: bookDetail.author })
          .setDescription(bookDetail.description)
          .setThumbnail(bookDetail.coverImage)
          .addFields(
            {
              name: "Page Number",
              value: bookDetail.pageNumber,
              inline: true,
            },
            { name: "Avg Ragting", value: bookDetail.avgRating, inline: true }
          )
          .setFooter({
            text: "Inspired by Bookie",
          });
        msg.channel.send({ embeds: [exampleEmbed] });
      } else {
        msg.channel.send("Humko ye kitab ni dikh raha.");
      }
    } catch (e) {
      msg.channel.send(
        "An error has occured, please make sure the command has a time delimiter and message"
      );
      console.error(e.toString());
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

    const type = msg.content.split(" ")[2];

    const allSigns = sunSigns.map((x) => x.name);
    if (allSigns.includes(sign)) {
      if (type) {
        if (type.toLowerCase() === "month") {
          const horoscope = await getMonthlyHoroscope(sign);
          msg.channel.send(horoscope);
        } else if (type.toLowerCase() === "week") {
          const horoscope = await getWeeklyHoroscope(sign);
          msg.channel.send(horoscope);
        } else if (type.toLowerCase() === "tomorrow") {
          const horoscope = await getHoroscopeTomorrow(sign);
          msg.channel.send(horoscope);
        } else if (type.toLowerCase() === "yesterday") {
          const horoscope = await getHoroscopeYesterday(sign);
          msg.channel.send(horoscope);
        } else {
          msg.channel.send("itna door to hum bhi ni soche h");
        }
      } else {
        const horoscope = await getHoroscope(sign);
        msg.channel.send(horoscope);
      }
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

    msg.channel.send(signs);
  }

  if (msg.content === "&halp") {
    const halp = `
Bhramand Nayak tumhari sahayta zarur karega
&status - to know the status of the bot
&remind - set a reminder. Use the format &remind <@person> <number> <duration> <reminder message>. for setting a duration, use s for second, m for minute, h for hour and d for days. Sample - &remind @mohan 1 s you forgot to write help command !
&horoscope <sun sign> - to get todays horoscope for the given sun sign.
&horoscope <sun sign> week - to get todays horoscope for the given sun sign for that week.
&horoscope <sun sign> month - to get todays horoscope for the given sun sign for that month.
&signs - to get the list of sun signs and the dates for the respective signs. You can find which sign you belong to using this command
&define <word> - use this to get the meaning of the word.
&doggo - to get a random dog picture
&kitty - to get a random cat picture
&monka - to get a random monka picture
&book <book name> - To get the book detail
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
