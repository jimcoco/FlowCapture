//export const ApiUrl = "http://localhost:8080/";
export const ApiUrl = "https://flowapi.onrender.com/"; 
export const Category = [
    "All",
    "Entertainment",
    "Media", "Protocol",
    "Investment",
    "Collectors",
    "Grants",
    "Research",
    "Creator",
    "Service",
    "Social",
    "Education",
    "Art and Culture"
]
export const Timezones = [
    "(GMT-11:00) Midway Island, Samoa",
    "(GMT-10:00) Hawai",
    "(GMT-8:00) Alaska",
    "(GMT-7:00) Dawson, Yukon, Arizona, Pacific Time",
    "(GMT-6:00) Mountain Time, Central America",
    "(GMT-5:00) Central Time, Lima, Quito",
    "(GMT-4:00) Eastern Time, Santiago,",
    "(GMT-3:00) Brasilia, Montevideo",
    "(GMT-2:30) Newfoundland and Labrador",
    "(GMT-2:00) Greenland",
    "(GMT-1:00) Cape Verde Islands",
    "(GMT+0:00) Azores, UTC,",
    "(GMT+1:00) London, Lisbon, Dublin",
    "(GMT+2:00) Belgrade, Warsaw, Berlin, Paris, Rome",
    "(GMT+3:00) Helsinki, Kyiv, Riga, Minsk, Moscow, Kuwait",
    "(GMT+3:30) Tehran",
    "(GMT+4:00) Abu Dhabi, Baku, Yerevan",
    "(GMT+4:30) Kabul",
    "(GMT+5:00) Ekaterinburg, Karachi, Tashkent",
    "(GMT+5:30) Chennai, New Delhi, Kolkata",
    "(GMT+5:45) Kathmandu",
    "(GMT+6:00) Astana, Almty, Dhaka, Novosibirsk",
    "(GMT+6:30) Yangon, Rangoon",
    "(GMT+7:00) Bangkok, Hanoi, Jakarta",
    "(GMT+8:00) Beijing, Hong Kong, Singapore, Kuala Lumpur",
    "(GMT+9:00) Seoul, Osaka, Tokyo, Yakutsk",
    "(GMT+9:30) Adelaide, Darwin",
    "(GMT+10:00) Canberra, Sydney, Brisbane, Vladivostok",
    "(GMT+11:00) Magadan, New Caledonia, Solomon Islands",
    "(GMT+12:00) Fiji Islands, Wellington, Auckland",
    "(GMT+13:00) Nuku'alofa"
]

export const Votingsystem = [
    {
        title: "Single Choice Voting",
        text: "Each voter can only vote for one candidate or choice. It is ideal for scenario where voter needs to choose on option from many.",
        badge: "",
        sel: false,
        active: true,
    },
    {
        title: "Two Round Voting",
        text: "A single choice voting system with two round. The two candidates or choices who received the most votes in the first round will enter the second round voting.",
        badge: "",
        sel: false,
        active: false,
    },
    {
        title: "Approval Voting",
        text: "Each voter can vote or “approve” multiple choices. Note that each selected choice will receive equal voting power.",
        badge: "Coming Soon",
        sel: false,
        active: false,
    },
    {
        title: "Quadratic Voting",
        text: "The mathematically optimal way to fund public goods in a democratic community where the number of contributors matters more than the actual amount funded",
        badge: "Coming Soon",
        sel: false,
        active: false,
    },
    {
        title: "Ranked-Choice Voting",
        text: "Voters rank candidates on their ballots in order of preference. A candidate is deemed the winner if they receive the majority of first-preference votes.",
        badge: "Coming Soon",
        sel: false,
        active: false,
    }
]

export const Votingstrategy = [
    {
        title: "Flow Fungible Token Balance ",
        text: "Each voter can only vote for one candidate or choice. It is ideal for scenario where voter needs to choose on option from many.",
        badge: "",
        sel: false,
        active: true,
    },
    {
        title: "Flow Fungible Token Balance /w Threshold",
        text: "A single choice voting system with two round. The two candidates or choices who received the most votes in the first round will enter the second round voting.",
        badge: "Coming Soon",
        sel: false,
        active: false,
    },
    {
        title: "Flow Non-Fungible Token Balance ",
        text: "Each voter can only vote for one candidate or choice. It is ideal for scenario where voter needs to choose on option from many.",
        badge: "Coming Soon",
        sel: false,
        active: false,
    },
    {
        title: "Flow Non-Fungible Token Balance /w Multiplier",
        text: "A single choice voting system with two round. The two candidates or choices who received the most votes in the first round will enter the second round voting.",
        badge: "Coming Soon",
        sel: false,
        active: false,
    },
    {
        title: "1P1V /w Flow Fungible Token",
        text: "Each voter can only vote for one candidate or choice. It is ideal for scenario where voter needs to choose on option from many.",
        badge: "Coming Soon",
        sel: false,
        active: false,
    },
    {
        title: "1P1V /w Flow Non-Fungible Token",
        text: "A single choice voting system with two round. The two candidates or choices who received the most votes in the first round will enter the second round voting.",
        badge: "Coming Soon",
        sel: false,
        active: false,
    },
    {
        title: "Multichain Voting",
        text: "Voters can vote using a token not only from the Flow Blockchain but other popular chain out there. The voting result will be calculated together.",
        badge: "Coming Soon",
        sel: false,
        active: false,
    },
    {
        title: "Delegation Voting",
        text: "Community members can choose to delegate voting powers to other trustworthy community members which is the “delegator”. ",
        badge: "Coming Soon",
        sel: false,
        active: false,
    },
    {
        title: "Flow Non-Fungible Token /w ID",
        text: "Only voters who are holding the community Non-Fungible Token with specific token IDs are eligible to vote for the proposal.",
        badge: "Coming Soon",
        sel: false,
        active: false,
    },
    {
        title: "Whitelist Voting",
        text: "Only voters who are in the whitelist are eligible to vote for the proposal. Proposal creator can submit a list of whitelist wallet addresses when creating the proposal.",
        badge: "Coming Soon",
        sel: false,
        active: false,
    },


]