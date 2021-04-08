import React, {useState, useEffect} from 'react';

function mountainNames () {
    return [
        {"name": "lookout", "lat": 47.45611828584227, "lng": -115.69710169853091, "display name": "Lookout Pass", "state": "ID"},
        {"name": "schweitzer", "lat": 48.36820376316482, "lng": -116.62277628870922, "display name": "Schweitzer Mountain", "state": "ID"},
        {"name": "silver_mountain", "lat": 47.49906915722505, "lng": -116.11885721016526, "display name": "Silver Mountain", "state": "ID"},
        {"name": "49degrees_north", "lat": 48.301204234032795, "lng": -117.56266933896624, "display name": "49° North", "state": "WA"},
        {"name": "mount_spokane", "lat": 47.923826183676, "lng": -117.11277380560337, "display name": "Mount Spokane", "state": "WA"},
        {"name": "whitefish", "lat": 48.480740487490934, "lng": -114.35014905615843, "display name": "Whitefish", "state": "MT"},
        {"name": "alpine_meadows", "lat": 39.16476641125912, "lng": -120.23860027188792, "display name": "Alpine Meadows", "state": "CA"},
        {"name": "big_bear_mountain", "lat": 34.228670112278024, "lng": -116.85781021020217, "display name": "Big Bear Mountain", "state": "CA"},
        {"name": "donner_ski_ranch", "lat": 39.31788128659341, "lng": -120.33026492955482, "display name": "Donner Ski Ranch", "state": "CA"}
    ]
}

export default mountainNames;