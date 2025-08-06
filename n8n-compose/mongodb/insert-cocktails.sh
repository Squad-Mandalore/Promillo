# docker-entrypoint-initdb.d/insert-cocktails.sh

set -e
mongo <<EOF
use cocktails

db.cocktails.insertMany([
  {
    "name": "Mojito",
    "zutaten": [
      { "zutat": "Weißen Rum", "menge": "60-90 ml" },
      { "zutat": "Wasser" },
      { "zutat": "Minze", "menge": "2-4" },
      { "zutat": "Zucker", "menge": "2 Tl." },
      { "zutat": "Limettensaft", "menge": "1" }
    ]
  },
  {
    "name": "Alexander",
    "zutaten": [
      { "zutat": "Cognac", "menge": "3 cl" },
      { "zutat": "Kakaolikör (braun)", "menge": "3 cl" },
      { "zutat": "Sahne", "menge": "3 cl" }
    ]
  },
  {
    "name": "Americano",
    "zutaten": [
      { "zutat": "Campari", "menge": "3 cl" },
      { "zutat": "Roter Wermut", "menge": "3 cl" },
      { "zutat": "Sodawasser" }
    ]
  },
  {
    "name": "Angel Face",
    "zutaten": [
      { "zutat": "Gin", "menge": "3 cl" },
      { "zutat": "Apricot Brandy", "menge": "3 cl" },
      { "zutat": "Calvados", "menge": "3 cl" }
    ]
  },
  {
    "name": "Aviation",
    "zutaten": [
      { "zutat": "Gin", "menge": "4,5 cl" },
      { "zutat": "Zitronensaft", "menge": "1,5 cl" },
      { "zutat": "Maraschino", "menge": "1,5 cl" }
    ]
  },
  {
    "name": "Between the Sheets",
    "zutaten": [
      { "zutat": "Weißer Rum", "menge": "3 cl" },
      { "zutat": "Cognac", "menge": "3 cl" },
      { "zutat": "Triple Sec", "menge": "3 cl" },
      { "zutat": "Zitronensaft", "menge": "2 cl" }
    ]
  },
  {
    "name": "Boulevardier",
    "zutaten": [
      { "zutat": "Bourbon oder Rye Whiskey", "menge": "3 cl" },
      { "zutat": "Campari", "menge": "3 cl" },
      { "zutat": "Roter Wermut", "menge": "3 cl" }
    ]
  },
  {
    "name": "Brandy Crusta",
    "zutaten": [
      { "zutat": "Cognac", "menge": "6 cl" },
      { "zutat": "Triple Sec", "menge": "1,5 cl" },
      { "zutat": "Maraschino", "menge": "0,5 cl" },
      { "zutat": "Zitronensaft", "menge": "1,5 cl" },
      { "zutat": "Zuckersirup", "menge": "1 Barlöffel" },
      { "zutat": "Angostura Bitter", "menge": "2 Dashes" }
    ]
  },
  {
    "name": "Casino",
    "zutaten": [
      { "zutat": "Old Tom Gin", "menge": "4 cl" },
      { "zutat": "Zitronensaft", "menge": "1 cl" },
      { "zutat": "Maraschino", "menge": "1 cl" },
      { "zutat": "Orange Bitter", "menge": "1 Dash" }
    ]
  },
  {
    "name": "Clover Club",
    "zutaten": [
      { "zutat": "Gin", "menge": "4,5 cl" },
      { "zutat": "Zitronensaft", "menge": "1,5 cl" },
      { "zutat": "Himbeersirup", "menge": "1,5 cl" },
      { "zutat": "Eiweiß", "menge": "1 Barlöffel" }
    ]
  },
  {
    "name": "Daiquiri",
    "zutaten": [
      { "zutat": "Weißer Rum", "menge": "4,5 cl" },
      { "zutat": "Limettensaft", "menge": "2,5 cl" },
      { "zutat": "Zuckersirup", "menge": "1,5 cl" }
    ]
  },
  {
    "name": "Barracuda",
    "zutaten": [
      { "zutat": "Goldener Rum", "menge": "4,5 cl" },
      { "zutat": "Galliano", "menge": "1,5 cl" },
      { "zutat": "Ananassaft", "menge": "6 cl" },
      { "zutat": "Limettensaft", "menge": "1,5 cl" },
      { "zutat": "Prosecco" }
    ]
  },
  {
    "name": "B-52",
    "zutaten": [
      { "zutat": "Kaffeelikör", "menge": "2 cl" },
      { "zutat": "Baileys Irish Cream", "menge": "2 cl" },
      { "zutat": "Triple Sec", "menge": "2 cl" }
    ]
  },
  {
    "name": "Brave Bull",
    "zutaten": [
      { "zutat": "Tequila", "menge": "4,5 cl" },
      { "zutat": "Kaffeelikör", "menge": "1,5 cl" }
    ]
  },
  {
    "name": "Caipirinha",
    "zutaten": [
      { "zutat": "Cachaça", "menge": "5 cl" },
      { "zutat": "Limette", "menge": "½" },
      { "zutat": "Rohrzucker", "menge": "2 TL" }
    ]
  },
  {
    "name": "Cosmopolitan",
    "zutaten": [
      { "zutat": "Wodka", "menge": "4 cl" },
      { "zutat": "Cointreau", "menge": "1,5 cl" },
      { "zutat": "Limettensaft", "menge": "1 cl" },
      { "zutat": "Cranberrysaft", "menge": "3 cl" }
    ]
  },
  {
    "name": "Espresso Martini",
    "zutaten": [
      { "zutat": "Wodka", "menge": "5 cl" },
      { "zutat": "Kaffeelikör", "menge": "1 cl" },
      { "zutat": "Espresso" },
      { "zutat": "Zucker" }
    ]
  },
  {
    "name": "French 75",
    "zutaten": [
      { "zutat": "Gin", "menge": "3 cl" },
      { "zutat": "Zitronensaft", "menge": "1,5 cl" },
      { "zutat": "Zuckersirup", "menge": "2 Dashes" },
      { "zutat": "Champagner" }
    ]
  },
  {
    "name": "Godfather",
    "zutaten": [
      { "zutat": "Scotch Whisky", "menge": "3,5 cl" },
      { "zutat": "Amaretto", "menge": "3,5 cl" }
    ]
  },
  {
    "name": "Harvey Wallbanger",
    "zutaten": [
      { "zutat": "Wodka", "menge": "4,5 cl" },
      { "zutat": "Orangensaft", "menge": "9 cl" },
      { "zutat": "Galliano", "menge": "1,5 cl" }
    ]
  },
  {
    "name": "Hemingway Special",
    "zutaten": [
      { "zutat": "Weißer Rum", "menge": "6 cl" },
      { "zutat": "Grapefruitsaft", "menge": "4 cl" },
      { "zutat": "Maraschino", "menge": "1,5 cl" },
      { "zutat": "Limettensaft", "menge": "1,5 cl" }
    ]
  },
  {
    "name": "Hugo",
    "zutaten": [
      { "zutat": "Holunderblütensirup", "menge": "1,5 cl" },
      { "zutat": "Prosecco", "menge": "6 cl" },
      { "zutat": "Sodawasser", "menge": "2 cl" },
      { "zutat": "Minze" },
      { "zutat": "Limette", "menge": "1 Scheibe" }
    ]
  },
  {
    "name": "Long Island Iced Tea",
    "zutaten": [
      { "zutat": "Wodka", "menge": "1,5 cl" },
      { "zutat": "Gin", "menge": "1,5 cl" },
      { "zutat": "Tequila", "menge": "1,5 cl" },
      { "zutat": "Rum", "menge": "1,5 cl" },
      { "zutat": "Triple Sec", "menge": "1,5 cl" },
      { "zutat": "Zitronensaft", "menge": "2,5 cl" },
      { "zutat": "Zuckersirup", "menge": "1,5 cl" },
      { "zutat": "Cola" }
    ]
  },
  {
    "name": "Mai Tai",
    "zutaten": [
      { "zutat": "Weißer Rum", "menge": "4 cl" },
      { "zutat": "Dunkler Rum", "menge": "2 cl" },
      { "zutat": "Triple Sec", "menge": "1,5 cl" },
      { "zutat": "Mandelsirup", "menge": "1 cl" },
      { "zutat": "Limettensaft", "menge": "1 cl" }
    ]
  },
  {
    "name": "Bee’s Knees",
    "zutaten": [
      { "zutat": "Gin", "menge": "5 cl" },
      { "zutat": "Zitronensaft", "menge": "2,5 cl" },
      { "zutat": "Honigsirup", "menge": "2 cl" }
    ]
  },
  {
    "name": "Bramble",
    "zutaten": [
      { "zutat": "Gin", "menge": "4 cl" },
      { "zutat": "Zitronensaft", "menge": "1,5 cl" },
      { "zutat": "Zuckersirup", "menge": "1 cl" },
      { "zutat": "Brombeerlikör", "menge": "1,5 cl" }
    ]
  },
  {
    "name": "Dark ’n’ Stormy",
    "zutaten": [
      { "zutat": "Dunkler Rum", "menge": "6 cl" },
      { "zutat": "Ginger Beer", "menge": "10 cl" },
      { "zutat": "Limettensaft", "menge": "1,5 cl" }
    ]
  },
  {
    "name": "French Martini",
    "zutaten": [
      { "zutat": "Wodka", "menge": "4,5 cl" },
      { "zutat": "Himbeerlikör", "menge": "1,5 cl" },
      { "zutat": "Ananassaft", "menge": "1,5 cl" }
    ]
  },
  {
    "name": "Moscow Mule",
    "zutaten": [
      { "zutat": "Wodka", "menge": "4,5 cl" },
      { "zutat": "Ginger Beer", "menge": "12 cl" },
      { "zutat": "Limettensaft", "menge": "0,5 cl" }
    ]
  },
  {
    "name": "Old Cuban",
    "zutaten": [
      { "zutat": "Dunkler Rum", "menge": "4,5 cl" },
      { "zutat": "Zuckersirup", "menge": "2 cl" },
      { "zutat": "Limettensaft", "menge": "2,5 cl" },
      { "zutat": "Champagner" },
      { "zutat": "Minze" },
      { "zutat": "Angostura Bitter", "menge": "2 Dashes" }
    ]
  },
  {
    "name": "Penicillin",
    "zutaten": [
      { "zutat": "Blended Scotch", "menge": "4,5 cl" },
      { "zutat": "Single Malt Scotch", "menge": "1 cl" },
      { "zutat": "Honigsirup", "menge": "2 cl" },
      { "zutat": "Zitronensaft", "menge": "2,5 cl" },
      { "zutat": "Ingwerlikör", "menge": "2 cl" }
    ]
  },
  {
    "name": "Tommy’s Margarita",
    "zutaten": [
      { "zutat": "Tequila", "menge": "4,5 cl" },
      { "zutat": "Limettensaft", "menge": "1,5 cl" },
      { "zutat": "Agavensirup", "menge": "2 Barlöffel" }
    ]
  },
  {
    "name": "Vesper",
    "zutaten": [
      { "zutat": "Gin", "menge": "6 cl" },
      { "zutat": "Wodka", "menge": "1,5 cl" },
      { "zutat": "Lillet Blanc", "menge": "0,75 cl" }
    ]
  },
  {
    "name": "Whiskey Smash",
    "zutaten": [
      { "zutat": "Bourbon Whiskey", "menge": "5 cl" },
      { "zutat": "Zitronensaft", "menge": "2,5 cl" },
      { "zutat": "Zuckersirup", "menge": "1,5 cl" },
      { "zutat": "Minze" }
    ]
  }
])
EOF
