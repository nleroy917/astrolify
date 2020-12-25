export const generateGreeting = (name, zodiac) => {
    let greetings = [
        `A good day is a good day. A bad day is a good story - ${name} probably`, 
        `Look out world it's, ${name}`, 
        `Looking good today, ${name}`,
        `I always knew ${zodiac}'s were the best looking.`,
        `${name} woke up like this.`,
        `Oh, you're a ${zodiac}? This playlist makes a lot more sense...`
    ]
    return greetings[Math.floor(Math.random() * greetings.length)]
}