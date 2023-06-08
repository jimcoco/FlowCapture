# FlowCapture - The Rise of Flow's DAO Era.

## Introduction | TL;DR

**FlowCapture is the first decentralized, off-chain, gasless governance and voting platform that is specially built for Flow-based DAOs.** It allows DAOs to build their own community space with custom branding, and manage their DAO activity in just one platform with a role-based management system. With its powerful and comprehensive voting system and built-in strategies, DAOs can set up and run their proposal voting dynamically with advanced customization. DAO members can easily participate in proposal voting on FlowCapture, as the voting user interface is designed to be user-friendly (even for a complete novice in blockchain space). 

> 💡 In short, FlowCapture is a powerful and comprehensive solution when comes to governance & voting in the Flow ecosystem. Now, it is **live on the Flow mainnet** and becoming the go-to choice for Flow-based DAOs!

##### 🔻 Core attributes

* **Decentralized**: Proposals, voting results and voters list, as well as DAO announcements, are fully stored on decentralized Web3.0 storage - IPFS (with the help of Web3.Storage and Pinata). Making everything easy to verify and hard to contest.

* **Off-chain**: All the activities in FlowCapture are hosted off-chain to greatly reduce the cost of powering DAO activities with blockchain. However, we are interacting with data on the Flow blockchain and everything is decentralized and transparent. That's why Flow Fungible Token  (FT) and Non-Fungible Token (NFT) can be fully utilized for governance and voting purposes in FlowCapture.

* **Gasless**: Say no to the high cost of gas fee! Flow-based DAOs can operate and run all the activities without any gas fee (free). There is also no burden for the community members to take part in DAO activities.

* **Open-Source with MIT license**: What does it mean when it is open-source and everyone can contribute to it? DAOs can build their own voting systems or features for certain purposes, and use them on FlowCapture. It has endless possibilities and growing fast!

## Inspiration | Why FlowCapture?

#####  <u>The status quo</u>

We can **barely see the emergence and growth of DAOs in the Flow ecosystem**, although we have all the advanced technologies in the Flow blockchain. For me, the key factor causing this situation is the lack of DAO-related tools and infrastructures in the Flow ecosystem. To be clearer on what we are currently facing, we can have a look at the Ethereum blockchain, which has lots of DAOs operating on top of it. One of the reasons is that the Ethereum ecosystem has [a variety of powerful tools and infrastructure](https://www.daomasters.xyz/) to support the operations and needs of Ethereum-based DAOs. Hence, in order to encourage more DAOs to operate on Flow, we must be clear on the need for a DAO's operation and put in the effort to develop an ecosystem of tools and infrastructures that are suitable for Flow-based DAOs. 

#####  <u>Solution for the status quo</u>

Hence, for this hackathon, I decided to build FlowCapture - the first decentralized, off-chain, gasless governance and voting platform that is specially built for Flow-based DAOs. As we know, **governance and voting are the core of a DAO**, and having a powerful and comprehensive solution in this field is essential for the emergence and development of the DAOs in the Flow ecosystem. With FlowCapture, **Flow-based DAOs can now operate their tokenized (Flow Fungible Token or NFT) community** with ease and open up a brand new era in Flow-verse - Flow's DAO Era.

## Features Overview of FlowCapture

<hr>

##### ⭐ Details of the features:

<hr>

#### ✔️ Build Your Own Community Space

![Build-Community-Townhall](https://github.com/Zhixuan0318/Blockforest/assets/69501009/d9dfcdd5-a07f-4f39-a27a-dda057fb11db)

In FlowCapture, community space is the place where all the DAO activities take place (such as proposal voting, etc.), and also where all the community members gathered and took part in the governance processes. Users can navigate and explore between different DAO's community spaces on the "Explore" page and add them to their subscribe list by joining them. 

Everyone can create their own DAO community space with our powerful and comprehensive community space creation process. Unlike some governance and voting tools in other blockchains which required users to buy an NFT domain from the native name service before opening up a space for their community, FlowCapture makes townhall creation totally costless and easy. Every community space created in FlowCapture can have its own unique .flow slug which acts as a custom branding for DAO (without the need for name service, as well as complicated setup and integration). After providing all the details needed in the multi-step community space creation process (which takes a couple of minutes), your community space is all set and ready to go! In FlowCapture, all the general info and configurations of the community space can be edited anytime in the settings after the creation of the space.

Worth mentioning that FlowCapture is using a **role-based management system** for community space operations. The creator or owner of a community space has the role of "**Warden**", which is the super admin of the community space and has the highest control and accessibility. This role can assign multiple "**Space Controllers**" which can help manage proposal creation and publishing.

<hr>

#### ✔️ Proposals | Voting System & Strategies

![Publish Proposal](https://github.com/Zhixuan0318/Blockforest/assets/69501009/b7cb8729-5236-4187-85d8-015396966eb9)

Creating proposal voting in FlowCapture is easy and fast with its multi-step process:

> **Provide proposal's general info \> Edit proposal content with our Markdown editor \> Choose a voting system \> Choose a voting strategy \>  Voting strategy settings \> Set up date and time \> Publish and ready to go!**

FlowCapture provides various types of voting systems and voting strategies for DAOs when conducting proposal voting. The voting systems are a set of rules which how the proposal voting is going to be conducted, while voting strategies determine how the voting power and results are calculated. Worth mentioning that, in FlowCapture, DAO has much flexibility and easiness to choose the right voting systems and voting strategies for its upcoming proposal, as simple as just selecting during the proposal creation (without the need to update the DAO setting every time). 

Here is a quick overview of all the voting systems and voting strategies in FlowCapture 👇:

**<u>Voting Systems</u>**

* **Single Choice Voting**: Each voter can only vote for one candidate or choice. It is ideal for a scenario where a voter needs to choose one option from many.

* **Approval Voting**: Each voter can vote or “approve” multiple choices. Note that each selected choice will receive equal voting power.

* **Two-Round Voting**: A single-choice voting system with two rounds. The two candidates or choices who received the most votes in the first round will enter the second round of voting.

**<u>Voting Strategies</u>**

* **Flow Fungible Token Balance **: The balance of the Flow Fungible Token in the voter’s wallet will be used to calculate the voting result. One token represents one vote (1T1V).

* **Flow Fungible Token Balance with Threshold**: In order to vote, the balance of the Flow Fungible Token in the voter’s wallet needs to be equal to or greater than the minimum threshold set. 

* **Flow Non-Fungible Token Balance **: The balance of the Flow NFT in the voter’s wallet will be used to calculate the voting result. One token represents one vote (1T1V).

* **Flow Non-Fungible Token Balance with Multiplier**: The voting power of each Flow NFT will be multiplied by a multiplier, and will be used to calculate the voting result.

* **1P1V voting for Flow FT and NFT**: Each voter who holds a specific Flow FT or NFT in the wallet will have a voting ticket with a custom symbol. Not looking at the balance of the holder, instead, one person represents one vote.

* **Whitelist Voting**: The proposal creator will upload a whitelist with eligible wallet addresses in it. Voters in the whitelist can vote on the proposal. Each voter will have a voting ticket with a custom symbol. One person represents one vote (1P1V) and it is single-choice voting.

#####  <u>FlowCapture supports Quorum</u>

![Quorum Threshold](https://github.com/Zhixuan0318/Blockforest/assets/69501009/48e24370-dfbe-4d55-8812-b4a9c9e8d006)

Furthermore, **FlowCapture does let proposal creator set up their proposal quorum** by indicating the quorum percentage and token circulating supply. A quorum is a minimum number of participating members(or in most cases, tokens) required for a governing body to approve a proposal. 

> For example: If a quorum is set to 50%, this means that 50% of all circulating tokens need to vote yes for the proposal to pass. This gets confused meaning that the proposal will pass with 50% of the voters choosing yes. The calculation looks at the circulating supply and requires that 50% of all the tokens need to choose yes for the proposal to pass. Even if 50% of all tokens participate, if 1 token vote for no, that vote will not pass.

Having a quorum is important in DAO's proposal voting to prevent some major risks (related to treasury and governance).  The quorum threshold and the votes required for a proposal to be approved will be displayed on the proposal's page as a reference for voters. If the proposal voting is ended but the votes don't pass the quorum threshold, FlowCapture will mark and display the status as: "N/A. Proposal do not meet the quorum threshold".

#####  <u>FlowCapture's Shielded Voting</u>

![Shielded](https://github.com/Zhixuan0318/Blockforest/assets/69501009/e3aac4ac-2cf0-478b-b6f6-75907b8c05bf)

Besides that, FlowCapture has introduced a new concept in DAO's proposal voting, which is called the **Shielded Voting**. In short, votes (voters list) and voting results are shielded throughout the voting period, and only will be revealed when the voting period is over. **There are some benefits when DAO enable FlowCapture's shielded voting for their proposal voting**:

* **Pre-voting information symmetry**: One bases their vote on their current understanding of the issue while making a vote. But at that time, another individual may have a very different experience. The individual who votes first has a completely different perspective from the one who votes last if the most recent voting result is available. The last voter would be aware of how other people have voted thus far, which may influence their decision. This sort of information asymmetry can be overcome through Superwarden's shielded voting. The same information should be available to all participants. Whether the details are shared in a public forum or just the poll description. The fairness of the governance decisions is improved by upholding the notion of each voter having equal access to information.

* **Partial privacy**: Public blockchains, like Flow, are by their very nature pseudo-anonymous. This characteristic makes sure that addresses can already largely conceal a person's identity. FlowCapture brings this to the next level by keeping the votes secret until the end of the voting session. So-called secret votes are made possible by this limited level of secrecy throughout the voting process. Until the voting ends and the results are made public, the number of votes submitted and the status of the vote are kept a secret. Except for the voter, no other participant can see who cast what votes prior to the revelation.

* **Prevent voter apathy and misbehavior**: If they believe their participation won't have an influence, people often follow the crowd or choose not to participate. By concealing the information, FlowCapture's shielded votes dramatically decrease these problems and improve fairness. The setting is more impartial for the voters when just a partial vote total is known. Voters are more honest since they aren't affected by previously cast votes, which increases the integrity of the vote. One isn't convinced to vote for the popular option since they can't observe how the vote is doing. Additionally, voters aren't deterred from casting a ballot since the majority has already voted in a manner that differs from their own choice.

* **Improved outcomes in voting**: The benefits of applying shielded voting in FlowCapture mentioned above can greatly increase the quality of the outcomes in proposal voting, leading to better governance in Flow-based DAOs.

<hr>

#### ✔️ Proposals | Community Voting

![votingui](https://github.com/Zhixuan0318/Blockforest/assets/69501009/1c3e1ab7-b9aa-492f-a120-844b599815ed)

Proposals created on FlowCapture will be all listed in the community space, with statuses of: `active`, `canceled`, and `complete`. All of the proposal's countdown and results will also be announced and displayed here. Community members can easily keep track of active (or important) proposals to vote on. For detailed proposal voting info and a summary (content) of the proposal, community members just have to tap into the proposal's individual page to check it all. Furthermore, a community member can also place their vote on the proposal's individual page too, by just clicking on "vote now", choose the voting options to vote, and submit his/her vote. **Voting is that simple on FlowCapture!** The votes will be recorded into the voters' list, this includes the wallet address of the voter, the voting option of the voter, and the votes (tokens or tickets) count contributed to the voting option.

Worth mentioning that, when the proposal is created, an identical copy will be stored on IPFS (stored on Web3.Storage, plus additional pinning on Pinata) and the CID will be displayed on the proposal's individual page as a reference. When the proposal voting ended, the voting result and voters' list will also be stored on the IPFS (stored on Web3.Storage, plus additional pinning on Pinata), and return a CID for future reference. **Voting on FlowCapture is transparent and the result is hard to contest with the help of decentralized Web3.0 storage!**

<hr>

#### ✔️ Streamline Process to Onboard New Community Members

![onboard](https://github.com/Zhixuan0318/Blockforest/assets/69501009/5e947fd1-2449-4907-8fdb-39da97154bfe)

FlowCapture provides a streamlined process to onboard new community members who are maybe new to DAO governance and voting in the Flow-verse. Simply just register your username and choose your own avatar, and leave all the complicated settings to FlowCapture. 


## What's next for FlowCapture? | Upcoming Milestones

As a university final year senior, hackathons and grant programs are always my funding source as well as support to keep building and upgrading this potential project. It is also a chance to introduce this interesting and powerful DAO tool - FlowCapture to the Flow community, as well as encourage more communities to build up their DAOs on the Flow ecosystem!  

After this hackathon, I had a few major milestones (roadmap) in my mind for this project 👇:

<hr>

#### ✔️ More voting systems coming soon!

###### <u>Quadratic Voting</u>
Quadratic Funding is the mathematically optimal way to fund public goods in a democratic community where the number of contributors matters more than the actual amount funded. As we can see, more DAOs that are related to funding and grant programs emerge in the crypto space. Hence, a quadratic voting system is a must on FlowCapture, so that DAOs can let their community members vote for potential projects which are going to share the funding pool. Each voter can choose to spread their voting power across a number of choices and the final result will be calculated using the quadratic funding formula.

###### <u>Ranked-Choice Voting (RCV)</u>
In a ranked-choice voting (RCV) system, voters rank candidates on their ballots in order of preference. A candidate is deemed the winner if they receive the majority of first-preference votes. The candidate with the fewest first-preference votes is removed if no contender receives a majority of those votes. Votes cast as first-preference for the failed candidate are eliminated, lifting the second-preference candidates listed on those ballots. To determine which candidate has received a majority of the revised votes, a fresh count is done. The procedure is carried out once again until a candidate secures an absolute majority.

<hr>

#### ✔️ More voting strategies coming soon!

###### <u>Multichain Strategy</u>

The multichain voting strategy is a cross-chain voting concept. It allows users to calculate their voting powers on multiple chains such as Ethereum, BNB chain, etc. This is a very useful voting strategy when a DAO's development is spread across multiple blockchains, and needed to utilize all of the assets on various chains in governance and voting actions.

###### <u>Delegation Strategy</u>
Soon, the delegation strategy will be introduced on FlowCapture. Community members can delegate their voting power to another wallet address (or we call it a "delegator"). Furthermore, FlowCapture's profile system will have a new delegation info section, which will display a user's delegation and delegates. 

###### <u>Flow Non-Fungible Token voting with specific token IDs</u>
Only community members who hold Flow NFT with specific token IDs can vote for the proposal. For example, only NFT with a specific rare attribute can vote for the proposal, hence, we can filter them using this voting strategy.

<hr>

#### ✔️ Tier Voting | A New Proposal Voting Threshold

In the next release, the user's FlowCapture profile will have a new section that records the number (count) of proposals voted in each of the DAO joined and also the timeline of voting. DAO can then create different tiers and set the required "proposal voted" number for each tier. When the proposal creator publishes a proposal, he/she can choose to mark the proposal as one of the tiers created. Hence, only community members which fulfill the tier requirement (the number of proposals voted) can participate in the voting of that proposal. A possible use case of setting a tier for a proposal voting is to prevent newcomers or inactive community members (who doesn't vote before) to vote on some important proposal. Furthermore, setting tiers for a community space also will encourage community members to actively participate in proposal voting (increase the "proposal voted" count) in order to upgrade their tier in the townhall/DAO. 

<hr>

#### ✔️ Voting Award System (Badges)

In the next release, the proposal creator can create award badges (Flow NFT) on FlowCapture and community members who vote for that proposal will be eligible to claim (mint) it. This feature can encourage more community members to participate in proposal voting and further improve the governance efficiency of a DAO. For example, DAOs can allow community members with a certain amount of badges to claim a gift or upgrade to a certain role in the community. Furthermore, as badges are Flow Non-Fungible Tokens, DAOs can also use them as a requirement or threshold to vote on some of the upcoming proposals.

<hr>

#### ✔️ FlowCapture's Discord Bot

FlowCapture Discord bot will automatically update community members about new proposal voting, proposal countdown, voting results, announcements, reminders, etc. Easily connect your FlowCapture community space with your community Discord server!

## How FlowCapture is built? | Behind The Scene

Here's a quick overview of the whole journey of building FlowCapture:

* Brainstorming and research on DAO-related topics (especially governance and voting)
* Planning and writing of blueprint
* UI/UX wireframing and designing
* Phase 1 development: townhall creation, profile system, explore page
* Phase 2 development: proposals creation, voting system, and voting strategies
* Testing and bug fixing 
* Final testing and deployment to the Flow Mainnet

## Challenges I ran into

Ensuring every combination of the voting system and voting strategy (which is the core of FlowCapture) works perfectly is the most challenging part. I conducted numerous testing with numerous conditions to make sure the logic behind every proposal voting is correct and reasonable. Although the process of fixing errors and bugs in the voting logic is a tough journey, everything is still managed to be done perfectly in the end. Now, Superwarden is live on the Flow mainnet and ready to serve all Flow-based DAOs.

## Accomplishments that I'm proud of

Flow being the first decentralized, off-chain, gasless governance and voting platform that is specially built for Flow-based DAOs had made a huge impact on the development of the DAO ecosystem in the Flow space, by providing the core tools and infrastructures for the DAO operation. I'm proud of everything about FlowCapture, and the final delivery of this project is really a big improvement for me in my tech journey. When I successfully created the first community space in FlowCapture, created the first proposal voting, submitted the first vote on FlowCapture, and the first result was uploaded onto IPFS from FlowCapture, the satisfaction is beyond expression in words. The small achievements and milestones throughout the journey are the accomplishments that I'm proud of! 

## What I learned?

This hackathon journey is truly tough and challenging but gave me the chance to push myself harder toward the limit. Brainstorming, researching, wireframing, designing, and leading the whole project development from scratch until a comprehensive product is an extraordinary experience and satisfaction. Besides gaining much knowledge from the technical aspects while building on Flow, I do learn a lot during my research and study of different DAOs' governance and operation methods. This really allows me to discover many potentials in this domain and inspires me to more powerful upgrades and features integration for FlowCapture. 
