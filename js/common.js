const API_URL = "https://vetsonly.fly.dev/api/";
const MESSAGES_PER_PAGE = 75;

const createMessage = (msg) => {
    const messageType = msg.systemMessageType;

    if (messageType === "LOGIN") return;

    const root = document.createElement('div');
    root.className = 'message';

    const timestamp = document.createElement('span');
    timestamp.className = 'timestamp';

    const dt = new Date(Number(msg.timestamp) * 1000);
    const parts = new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'UTC' // Important: force UTC time
    }).formatToParts(dt);

    const getPart = (type) => parts.find(p => p.type === type)?.value;

    timestamp.textContent = `[${getPart('day')} ${getPart('month')}, ${getPart('hour')}:${getPart('minute')}]`;
    root.appendChild(timestamp);

    if (messageType === "NORMAL") {
        const rank = document.createElement('span');
        rank.className = 'rank';

        const img = document.createElement('img');
        if (msg.clanTitle === "Deputy Owner") {
            msg.clanTitle = "Deputy owner";
        }
        const imageName = msg.clanTitle.replaceAll(" ", "_");
        img.src = `https://oldschool.runescape.wiki/images/Clan_icon_-_${imageName}.png`;
        img.alt = msg.clanTitle;
        rank.appendChild(img);
        root.appendChild(rank);
    }

    let helmetImgSrc = null;
    switch (msg.accountType) {
        case "IRON":
            helmetImgSrc = "https://oldschool.runescape.wiki/images/Ironman_chat_badge.png";
            break;
        case "HARDCORE_IRON":
            helmetImgSrc = "https://oldschool.runescape.wiki/images/Hardcore_ironman_chat_badge.png";
            break;
        case "ULTIMATE_IRON":
            helmetImgSrc = "https://oldschool.runescape.wiki/images/Ultimate_ironman_chat_badge.png";
            break;
        case "UNRANKED_IRON":
            helmetImgSrc = "https://oldschool.runescape.wiki/images/Unranked_group_ironman_chat_badge.png";
            break;
        case "GROUP_IRON":
            helmetImgSrc = "https://oldschool.runescape.wiki/images/Group_ironman_chat_badge.png";
            break;
        case "HARDCORE_GROUP_IRON":
            helmetImgSrc = "https://oldschool.runescape.wiki/images/Hardcore_group_ironman_chat_badge.png";
            break;
    }
    if (helmetImgSrc !== null) {
        const helmet = document.createElement('span');
        helmet.className = 'helmet';
        const img = document.createElement('img');
        img.src = helmetImgSrc;
        img.alt = msg.accountType;
        img.width = 16;
        helmet.appendChild(img);
        root.appendChild(helmet);
    }

    if (messageType === "NORMAL") {
        const author = document.createElement('span');
        author.className = 'author';
        author.textContent = `${msg.author}: `;
        root.appendChild(author);
    }

    const contents = document.createElement('span');
    contents.className = messageType === "NORMAL" ? "chat" : "announcement";
    if (messageType === "COMBAT_ACHIEVEMENTS") {
        contents.textContent = msg.content.replace(/^CA_ID:\d+\|/, '');
    } else {
        contents.textContent = msg.content;
    }
    root.appendChild(contents);

    return root;
}