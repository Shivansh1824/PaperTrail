import csv
import json
import os
from datetime import datetime

# Paths
DATASETS_DIR = "/Users/shivanshrana/Desktop/WebRush/datasets"
OUTPUT_DIR = "/Users/shivanshrana/Desktop/WebRush/src/data"
os.makedirs(OUTPUT_DIR, exist_ok=True)

spotify_file = os.path.join(DATASETS_DIR, "spotify_history.csv")
household_file = os.path.join(DATASETS_DIR, "Daily Household Transactions.csv")

# 1. Load Household transactions from 2018
transactions = []
with open(household_file, "r", encoding="utf-8") as f:
    reader = csv.DictReader(f)
    for row in reader:
        # Filter mostly to 2018 where detailed time notes exist
        date_str = row["Date"].strip()
        if "/2018" in date_str:
            transactions.append(row)

# 2. Load Spotify tracks from 2018
spotify_tracks = []
with open(spotify_file, "r", encoding="utf-8") as f:
    reader = csv.DictReader(f)
    for row in reader:
        ts = row.get("ts", "")
        if "2018" in ts:
            spotify_tracks.append(row)
            if len(spotify_tracks) > 500:
                break

print(f"Loaded {len(transactions)} 2018 transactions, {len(spotify_tracks)} 2018 spotify tracks")

# Now let's build cohesive, connected life receipts across the 9 dimensions:
# Music, Movies & Entertainment, Places, Purchases, Photos, Messages, Searches, Events, Notes

receipts = [
    # --- CHAPTER 1: THE MIDNIGHT HUSTLER (2 AM - 4 AM) ---
    {
        "id": "rec-101",
        "chapterId": "ch-1",
        "type": "music",
        "title": "Midnight City — M83",
        "category": "Music Stream",
        "timestamp": "2018-09-17T02:14:20Z",
        "timeOfDay": "midnight",
        "amount": 0,
        "currency": "INR",
        "details": {
            "artist": "M83",
            "album": "Hurry Up, We're Dreaming",
            "platform": "Spotify Web Player",
            "duration": "4m 03s",
            "repeatCount": 7,
            "device": "MacBook Pro"
        },
        "mood": "hypnotic",
        "significance": "Played on loop 7 times between 2:00 AM and 2:35 AM while working on design decks.",
        "connectedReceiptIds": ["rec-102", "rec-103", "rec-104", "rec-105"]
    },
    {
        "id": "rec-102",
        "chapterId": "ch-1",
        "type": "purchases",
        "title": "Mobile Data Booster Pack (3GB)",
        "category": "Purchase",
        "timestamp": "2018-09-17T23:41:17Z",
        "timeOfDay": "midnight",
        "amount": 19,
        "currency": "INR",
        "details": {
            "merchant": "Saving Bank account 1",
            "subcategory": "Mobile Service Provider",
            "note": "Data booster pack at 11:41 PM",
            "paymentMode": "Net Banking"
        },
        "mood": "desperate",
        "significance": "Home Wi-Fi throttled right before a midnight deadline. Quick ₹19 emergency recharge.",
        "connectedReceiptIds": ["rec-101", "rec-103", "rec-105"]
    },
    {
        "id": "rec-103",
        "chapterId": "ch-1",
        "type": "searches",
        "title": "Search: 'how to stay awake without heart palpitations'",
        "category": "Search",
        "timestamp": "2018-09-17T03:02:11Z",
        "timeOfDay": "midnight",
        "amount": 0,
        "currency": "INR",
        "details": {
            "engine": "Google Chrome",
            "queries": [
                "caffeine half life",
                "cold water splash technique",
                "can you work 48h straight without brain damage"
            ],
            "clicks": ["Healthline - Safe Caffeine Limits"]
        },
        "mood": "exhausted",
        "significance": "The physical reality of late-night startup work catching up at 3 AM.",
        "connectedReceiptIds": ["rec-101", "rec-102", "rec-104"]
    },
    {
        "id": "rec-104",
        "chapterId": "ch-1",
        "type": "notes",
        "title": "Quick Note: 'if this launch fails, pivot to open-source'",
        "category": "Personal Note",
        "timestamp": "2018-09-17T03:45:00Z",
        "timeOfDay": "midnight",
        "amount": 0,
        "currency": "INR",
        "details": {
            "app": "Apple Notes",
            "wordCount": 84,
            "snippet": "Don't panic. The landing page looks good. Shifting the deadline to Tuesday morning. Keep the typography clean."
        },
        "mood": "vulnerable",
        "significance": "A quiet private realization scribbled in the dark before finally collapsing to sleep.",
        "connectedReceiptIds": ["rec-101", "rec-103", "rec-105"]
    },
    {
        "id": "rec-105",
        "chapterId": "ch-1",
        "type": "purchases",
        "title": "Late Night Snacks (Maggi & Cold Coffee)",
        "category": "Food & Dining",
        "timestamp": "2018-09-17T01:15:00Z",
        "timeOfDay": "midnight",
        "amount": 85,
        "currency": "INR",
        "details": {
            "merchant": "Night Corner Mart",
            "items": ["2x Special Masala Maggi", "1x Cold Brew Bottle"],
            "paymentMode": "Cash"
        },
        "mood": "comfort",
        "significance": "Fuel for the 2 AM coding sprint.",
        "connectedReceiptIds": ["rec-101", "rec-102", "rec-104"]
    },
    {
        "id": "rec-106",
        "chapterId": "ch-1",
        "type": "messages",
        "title": "Message to Rohan: 'sent the repo, going to sleep'",
        "category": "Message",
        "timestamp": "2018-09-17T04:12:00Z",
        "timeOfDay": "midnight",
        "amount": 0,
        "currency": "INR",
        "details": {
            "platform": "WhatsApp",
            "recipient": "Rohan (Co-founder)",
            "status": "Delivered",
            "replyReceived": "2018-09-17T08:15:00Z ('Bro you're insane get some sleep')"
        },
        "mood": "relieved",
        "significance": "The sign-off that marked the end of an all-nighter.",
        "connectedReceiptIds": ["rec-101", "rec-104"]
    },

    # --- CHAPTER 2: THE COMMUTE & THE DAILY GRIND ---
    {
        "id": "rec-201",
        "chapterId": "ch-2",
        "type": "places",
        "title": "Local Train Ticket: Station Place 5 to Place 0",
        "category": "Transit",
        "timestamp": "2018-09-20T12:04:08Z",
        "timeOfDay": "afternoon",
        "amount": 30,
        "currency": "INR",
        "details": {
            "merchant": "Cash",
            "category": "Transportation",
            "subcategory": "Train",
            "route": "Place 5 → Place 0 (Return Ticket)",
            "distanceKm": 24.5
        },
        "mood": "focused",
        "significance": "The recurring commute line that defined this season of life.",
        "connectedReceiptIds": ["rec-202", "rec-203", "rec-204", "rec-205"]
    },
    {
        "id": "rec-202",
        "chapterId": "ch-2",
        "type": "purchases",
        "title": "Idli Medu Vada Mix (2 Plates)",
        "category": "Food & Dining",
        "timestamp": "2018-09-20T12:03:15Z",
        "timeOfDay": "afternoon",
        "amount": 60,
        "currency": "INR",
        "details": {
            "merchant": "Cash",
            "location": "Station Platform Canteen",
            "note": "Idli medu Vada mix 2 plates",
            "category": "Food",
            "subcategory": "snacks"
        },
        "mood": "nostalgic",
        "significance": "Purchased literally 53 seconds before boarding the train. Fast fuel.",
        "connectedReceiptIds": ["rec-201", "rec-203", "rec-206"]
    },
    {
        "id": "rec-203",
        "chapterId": "ch-2",
        "type": "music",
        "title": "Do I Wanna Know? — Arctic Monkeys",
        "category": "Music Stream",
        "timestamp": "2018-09-20T12:08:45Z",
        "timeOfDay": "afternoon",
        "amount": 0,
        "currency": "INR",
        "details": {
            "artist": "Arctic Monkeys",
            "album": "AM",
            "platform": "Spotify Mobile",
            "duration": "4m 32s",
            "context": "Window seat, rumble of local train tracks"
        },
        "mood": "brooding",
        "significance": "The soundtrack to staring out of the train window at rain streaks.",
        "connectedReceiptIds": ["rec-201", "rec-202", "rec-204"]
    },
    {
        "id": "rec-204",
        "chapterId": "ch-2",
        "type": "photos",
        "title": "Snapshot: 'Monsoon Over Platform 2'",
        "category": "Photo",
        "timestamp": "2018-09-20T12:01:30Z",
        "timeOfDay": "afternoon",
        "amount": 0,
        "currency": "INR",
        "details": {
            "camera": "OnePlus 5T",
            "resolution": "16MP",
            "tags": ["rain", "train", "reflection", "chai"],
            "location": "Station Place 5"
        },
        "mood": "aesthetic",
        "significance": "A 2-second capture of yellow raincoats and glistening railway tracks.",
        "connectedReceiptIds": ["rec-201", "rec-202", "rec-203"]
    },
    {
        "id": "rec-205",
        "chapterId": "ch-2",
        "type": "purchases",
        "title": "Auto Rickshaw Ride to Permanent Residence",
        "category": "Transit",
        "timestamp": "2018-09-14T05:39:17Z",
        "timeOfDay": "morning",
        "amount": 50,
        "currency": "INR",
        "details": {
            "merchant": "Cash",
            "subcategory": "auto",
            "route": "Place 2 station to Permanent Residence"
        },
        "mood": "tired",
        "significance": "Early morning arrival back home after an overnight journey.",
        "connectedReceiptIds": ["rec-201", "rec-206"]
    },
    {
        "id": "rec-206",
        "chapterId": "ch-2",
        "type": "purchases",
        "title": "Daily Half Litre Milk & Grocery (1kg Atta)",
        "category": "Purchase",
        "timestamp": "2018-09-13T21:01:32Z",
        "timeOfDay": "evening",
        "amount": 82,
        "currency": "INR",
        "details": {
            "items": ["1kg atta (₹46)", "Half lit milk (₹36)"],
            "merchant": "Local Kirana Store",
            "category": "Food / Grocery"
        },
        "mood": "grounded",
        "significance": "The quiet domestic routine of cooking for one's self in the evening.",
        "connectedReceiptIds": ["rec-201", "rec-205"]
    },

    # --- CHAPTER 3: THE FESTIVAL & COMING HOME ---
    {
        "id": "rec-301",
        "chapterId": "ch-3",
        "type": "events",
        "title": "Ganesh Idol for Home Pujan",
        "category": "Event & Culture",
        "timestamp": "2018-09-16T17:15:08Z",
        "timeOfDay": "evening",
        "amount": 251,
        "currency": "INR",
        "details": {
            "merchant": "Cash",
            "category": "Festivals",
            "subcategory": "Ganesh Pujan",
            "note": "Ganesh idol purchase with family"
        },
        "mood": "celebratory",
        "significance": "A warm festive ritual marking family togetherness after months of isolated grind.",
        "connectedReceiptIds": ["rec-302", "rec-303", "rec-304", "rec-305"]
    },
    {
        "id": "rec-302",
        "chapterId": "ch-3",
        "type": "purchases",
        "title": "Festive Modak Sweets & Flowers",
        "category": "Food & Dining",
        "timestamp": "2018-09-16T18:00:20Z",
        "timeOfDay": "evening",
        "amount": 180,
        "currency": "INR",
        "details": {
            "merchant": "Shree Ganesh Mithai",
            "items": ["Ukadiche Modak (6 pcs)", "Marigold Garland"]
        },
        "mood": "joyful",
        "significance": "The scent of cardamom and fresh flowers filling the apartment.",
        "connectedReceiptIds": ["rec-301", "rec-303"]
    },
    {
        "id": "rec-303",
        "chapterId": "ch-3",
        "type": "music",
        "title": "Sufi & Classical Folk Acoustic Playlist",
        "category": "Music Stream",
        "timestamp": "2018-09-16T19:30:00Z",
        "timeOfDay": "evening",
        "amount": 0,
        "currency": "INR",
        "details": {
            "playlist": "Indian Acoustic & Festive Classical",
            "platform": "Spotify Web Player",
            "playedOn": "Living Room Bluetooth Speaker"
        },
        "mood": "peaceful",
        "significance": "A shift away from indie rock synthesizers to sitar, flute, and morning ragas.",
        "connectedReceiptIds": ["rec-301", "rec-302", "rec-304"]
    },
    {
        "id": "rec-304",
        "chapterId": "ch-3",
        "type": "photos",
        "title": "Family Aarti with Lit Diyas",
        "category": "Photo",
        "timestamp": "2018-09-16T20:15:00Z",
        "timeOfDay": "evening",
        "amount": 0,
        "currency": "INR",
        "details": {
            "tags": ["festival", "lights", "family", "aarti"],
            "caption": "First time everyone is under one roof since March."
        },
        "mood": "warm",
        "significance": "A rare family photograph where no laptops or work notifications were in sight.",
        "connectedReceiptIds": ["rec-301", "rec-303", "rec-305"]
    },
    {
        "id": "rec-305",
        "chapterId": "ch-3",
        "type": "purchases",
        "title": "Pocket Money Given to Younger Cousin",
        "category": "Family & Gift",
        "timestamp": "2018-09-08T15:20:00Z",
        "timeOfDay": "afternoon",
        "amount": 40,
        "currency": "INR",
        "details": {
            "merchant": "Cash",
            "category": "Family",
            "subcategory": "Pocket money",
            "note": "Ice cream treat for kid cousin"
        },
        "mood": "generous",
        "significance": "The feeling of becoming the older sibling who can hand out small treats.",
        "connectedReceiptIds": ["rec-301", "rec-304"]
    },
    {
        "id": "rec-306",
        "chapterId": "ch-3",
        "type": "purchases",
        "title": "Transfer from Family (+₹3,500)",
        "category": "Family Support",
        "timestamp": "2018-09-11T11:45:00Z",
        "timeOfDay": "morning",
        "amount": 3500,
        "currency": "INR",
        "details": {
            "type": "Income",
            "note": "From Family support into Savings Bank",
            "significance": "A safety net deposit sent by parents to ensure rent and bills were covered."
        },
        "mood": "grateful",
        "significance": "A reminder of the silent parental cushion supporting the venture.",
        "connectedReceiptIds": ["rec-301", "rec-305"]
    },

    # --- CHAPTER 4: THE RECHARGE & DIGITAL ESCAPISM ---
    {
        "id": "rec-401",
        "chapterId": "ch-4",
        "type": "entertainment",
        "title": "Netflix 1-Month Subscription Renewal",
        "category": "Entertainment",
        "timestamp": "2018-09-19T20:10:00Z",
        "timeOfDay": "evening",
        "amount": 199,
        "currency": "INR",
        "details": {
            "merchant": "Saving Bank account 1",
            "category": "subscription",
            "subcategory": "Netflix",
            "plan": "Mobile/Basic Tier"
        },
        "mood": "relaxing",
        "significance": "Re-subscribing for the weekend to disconnect from pull requests and sprint boards.",
        "connectedReceiptIds": ["rec-402", "rec-403", "rec-404"]
    },
    {
        "id": "rec-402",
        "chapterId": "ch-4",
        "type": "entertainment",
        "title": "Tata Play DTH Recharge (Permanent Residence)",
        "category": "Entertainment",
        "timestamp": "2018-09-15T06:34:17Z",
        "timeOfDay": "morning",
        "amount": 200,
        "currency": "INR",
        "details": {
            "merchant": "Credit Card",
            "category": "subscription",
            "subcategory": "Tata Sky",
            "note": "Permanent Residence - Tata Play recharge"
        },
        "mood": "caring",
        "significance": "Recharging the family TV package so grandparents could watch cricket.",
        "connectedReceiptIds": ["rec-401", "rec-405"]
    },
    {
        "id": "rec-403",
        "chapterId": "ch-4",
        "type": "entertainment",
        "title": "Harvard Business Review (2 Months)",
        "category": "Entertainment",
        "timestamp": "2018-09-13T21:01:47Z",
        "timeOfDay": "evening",
        "amount": 83,
        "currency": "INR",
        "details": {
            "merchant": "Credit Card",
            "subcategory": "HBR 2 Months subscription",
            "medium": "Digital Edition"
        },
        "mood": "ambitious",
        "significance": "Attempting to learn product strategy and leadership between Netflix sessions.",
        "connectedReceiptIds": ["rec-401", "rec-404"]
    },
    {
        "id": "rec-404",
        "chapterId": "ch-4",
        "type": "music",
        "title": "Kids / Time to Pretend — MGMT",
        "category": "Music Stream",
        "timestamp": "2018-09-19T22:30:15Z",
        "timeOfDay": "evening",
        "amount": 0,
        "currency": "INR",
        "details": {
            "artist": "MGMT",
            "album": "Oracular Spectacular",
            "platform": "Spotify Web Player",
            "duration": "5m 03s"
        },
        "mood": "nostalgic",
        "significance": "Pure 2010s indie escapism blaring while unwinding with Netflix in background.",
        "connectedReceiptIds": ["rec-401", "rec-403"]
    },
    {
        "id": "rec-405",
        "chapterId": "ch-4",
        "type": "purchases",
        "title": "Home Food Delivery Dinner",
        "category": "Food & Dining",
        "timestamp": "2018-09-11T20:30:00Z",
        "timeOfDay": "evening",
        "amount": 650,
        "currency": "INR",
        "details": {
            "merchant": "Saving Bank account 1",
            "subcategory": "Lunch/Dinner",
            "note": "Home Food Delivery with roommates"
        },
        "mood": "indulgent",
        "significance": "A celebratory feast after shipping a key milestone.",
        "connectedReceiptIds": ["rec-401", "rec-402"]
    },
    {
        "id": "rec-406",
        "chapterId": "ch-4",
        "type": "searches",
        "title": "Search: 'best weekend hill station near station place 0'",
        "category": "Search",
        "timestamp": "2018-09-18T16:20:00Z",
        "timeOfDay": "afternoon",
        "amount": 0,
        "currency": "INR",
        "details": {
            "queries": [
                "budget homestay lonavala or matheran",
                "train schedule friday evening",
                "trekking shoes under 2000"
            ]
        },
        "mood": "wanderlust",
        "significance": "Planning the next great escape from the city.",
        "connectedReceiptIds": ["rec-401", "rec-404"]
    }
]

# Add more real entries from Daily Household Transactions to flesh out the vault
# Let's map real rows into vault receipts
extra_id = 500
for row in transactions[10:90]:
    extra_id += 1
    cat = row.get("Category", "Other")
    subcat = row.get("Subcategory", "")
    note = row.get("Note", "")
    amt_str = row.get("Amount", "0").replace(",", "").strip()
    try:
        amt = float(amt_str) if amt_str else 0
    except:
        amt = 0
    
    # Determine type
    rtype = "purchases"
    if cat.lower() in ["transportation"]:
        rtype = "places"
    elif cat.lower() in ["subscription", "entertainment"]:
        rtype = "entertainment"
    elif cat.lower() in ["festivals"]:
        rtype = "events"
    elif "note" in note.lower():
        rtype = "notes"

    title = f"{subcat or cat}: {note}" if note else f"{subcat or cat} ({cat})"
    
    receipts.append({
        "id": f"rec-{extra_id}",
        "chapterId": "ch-2" if rtype == "places" else "ch-4",
        "type": rtype,
        "title": title,
        "category": cat,
        "timestamp": f"2018-09-10T14:{extra_id%60:02d}:00Z",
        "timeOfDay": "afternoon" if extra_id % 3 == 0 else "morning" if extra_id % 3 == 1 else "evening",
        "amount": amt,
        "currency": "INR",
        "details": {
            "merchant": row.get("Mode", "Cash"),
            "category": cat,
            "subcategory": subcat,
            "note": note
        },
        "mood": "routine",
        "significance": f"Daily life itemization: {cat} - {subcat}.",
        "connectedReceiptIds": ["rec-201", "rec-206"]
    })

# Add real 2018 Spotify tracks into vault
spotify_id = 800
for track in spotify_tracks[20:100]:
    spotify_id += 1
    t_name = track.get("track_name", "Unknown Track")
    a_name = track.get("artist_name", "Unknown Artist")
    alb_name = track.get("album_name", "")
    ms = int(track.get("ms_played", 0))
    ts = track.get("ts", "2018-09-15 12:00:00")
    # hour check
    hour = int(ts.split(" ")[1].split(":")[0]) if " " in ts else 12
    time_of_day = "midnight" if (hour >= 23 or hour <= 4) else "morning" if hour <= 11 else "afternoon" if hour <= 17 else "evening"
    
    receipts.append({
        "id": f"rec-{spotify_id}",
        "chapterId": "ch-1" if time_of_day == "midnight" else "ch-2",
        "type": "music",
        "title": f"{t_name} — {a_name}",
        "category": "Music Stream",
        "timestamp": ts.replace(" ", "T") + "Z",
        "timeOfDay": time_of_day,
        "amount": 0,
        "currency": "INR",
        "details": {
            "artist": a_name,
            "track": t_name,
            "album": alb_name,
            "duration": f"{ms//60000}m {(ms%60000)//1000}s",
            "platform": track.get("platform", "Spotify")
        },
        "mood": "hypnotic" if time_of_day == "midnight" else "energetic",
        "significance": f"Streamed at {ts} on {track.get('platform', 'Spotify')}.",
        "connectedReceiptIds": ["rec-101"] if time_of_day == "midnight" else ["rec-203"]
    })

chapters = [
    {
        "id": "ch-1",
        "number": "01",
        "title": "The Midnight Hustler",
        "subtitle": "2:00 AM — 4:30 AM",
        "tagline": "When caffeine, indie rock, and insomnia build a future.",
        "description": "Between midnight data booster top-ups and infinite M83 loops, the receipts reveal a season of relentless late-night creation, self-doubt, and quiet grit.",
        "themeColor": "hsl(265, 80%, 65%)",
        "leadReceiptId": "rec-101",
        "stats": {
            "topArtist": "M83 & MGMT",
            "midnightHours": "42 hrs logged",
            "emergencyRecharges": "₹57 spent",
            "dominantEmotion": "Insomniac Ambition"
        },
        "keyMoments": ["rec-101", "rec-102", "rec-103", "rec-104", "rec-105", "rec-106"]
    },
    {
        "id": "ch-2",
        "number": "02",
        "title": "The Daily Commute & The Grind",
        "subtitle": "7:00 AM — 1:30 PM",
        "tagline": "24.5 kilometers on the local line, two plates of idli, and Arctic Monkeys.",
        "description": "Every weekday told the exact same story: local train tickets from Place 5 to Place 0, breakfast bought 53 seconds before departure, and staring out rainy windows.",
        "themeColor": "hsl(200, 85%, 55%)",
        "leadReceiptId": "rec-201",
        "stats": {
            "totalTrainDistance": "1,180 km",
            "quickSnacks": "₹360",
            "commuteSoundtrack": "Arctic Monkeys — AM",
            "dominantEmotion": "Quiet Persistence"
        },
        "keyMoments": ["rec-201", "rec-202", "rec-203", "rec-204", "rec-205", "rec-206"]
    },
    {
        "id": "ch-3",
        "number": "03",
        "title": "The Festival Homecoming",
        "subtitle": "September Festive Season",
        "tagline": "The sacred smell of marigolds, ₹251 Ganesh idol, and reunion.",
        "description": "When the screen turned off and family gathered. The data reveals a dramatic shift: acoustic ragas replaced synth loops, sweets replaced fast food, and family support arrived.",
        "themeColor": "hsl(35, 95%, 55%)",
        "leadReceiptId": "rec-301",
        "stats": {
            "festiveSpend": "₹671",
            "familyVisits": "4 days",
            "acousticHours": "18 hrs",
            "dominantEmotion": "Grounded Warmth"
        },
        "keyMoments": ["rec-301", "rec-302", "rec-303", "rec-304", "rec-305", "rec-306"]
    },
    {
        "id": "ch-4",
        "number": "04",
        "title": "The Digital Escapism & Recharge",
        "subtitle": "Weekend Evenings",
        "tagline": "Netflix renewals, HBR subscriptions, and late-night food deliveries.",
        "description": "The delicate balance between high-minded ambition (reading HBR) and total digital decompression (binging shows and streaming nostalgic MGMT anthems).",
        "themeColor": "hsl(340, 85%, 60%)",
        "leadReceiptId": "rec-401",
        "stats": {
            "subscriptions": "₹482",
            "groupMeals": "₹650",
            "weekendLoops": "Kids by MGMT",
            "dominantEmotion": "Yearning for Balance"
        },
        "keyMoments": ["rec-401", "rec-402", "rec-403", "rec-404", "rec-405", "rec-406"]
    }
]

# Write out JSON files
with open(os.path.join(OUTPUT_DIR, "life_receipts.json"), "w", encoding="utf-8") as f:
    json.dump(receipts, f, indent=2)

with open(os.path.join(OUTPUT_DIR, "chapters.json"), "w", encoding="utf-8") as f:
    json.dump(chapters, f, indent=2)

print(f"Generated {len(receipts)} receipts and {len(chapters)} chapters in {OUTPUT_DIR}")
