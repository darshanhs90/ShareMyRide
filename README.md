# Hack-The-Planet-Hack
Project Link:http://devpost.com/software/bitsplit-02ce1v
<br/>
##Inspiration
Very often do we shop online and then take care about splitting up bills in one medium and settling up through another. Come BitSplit and all your splitting/settling up needs are taken care of. Payment through card, paypal and even bitcoins are taken care of.

##How it works
We tackle the issue, buy splitting up the bill amount before an order is placed. Each individual pays their own share. Upon successful payment of all splits, the order is placed.

Search for an item in store (eBay currently)
Select and place order
For individual orders, payments are made directly. Options of Card, Paypal and Bitcoins available.
Bitcoin balance, exchange rates and bitcoin rates over a period of time also available.
Split Payments can be made by entering e-mail addresses and split percentages.
The mail recipients will have to pay for their share using the link sent to them in the mail.
Upon successful payment of all shares. Order is placed
Pay outstanding bills using Paypal or BitCoins (You could also search for nearest CapitalOne ATMs)

##We used
Search is done using eBay APIs. Paypal and Card Payments are handled using Braintree APIs Bitcoin payments and wallet transactions are handled using Blockchain APIs Payment info mails are sent using Sendgrid APIs Payment of outstanding bills and getting location of nearest ATM's using CapitalOne APIs

##Challenges I ran into
Handling multiple shares, tracking success and failure of each payments Integrating Bitcoin wallet

##Accomplishments that I'm proud of
Novelty application for share and pay Handle multiple methods of payment options

##What I learned
The underlying technology of Bitcoins

##What's next for BitSplit
Setup timers and reminder mails/calls for payment. Provide incentives for usage of split-payment option. Build an extension for e-commerce sites where the goods would be ordered upon receiving payments from all splits. 

##Built With
html5
angular.js
node.js
blockchain
braintree
ebay
capital-one
sendgrid
