const fs = require('fs');
const _ = require('lodash');

// Create Mock User
const mockUser = {
    userId:"9099351d-eb78-45f1-b0fd-9058878b713e",
    category: ["4e16c328-23d8-4799-8227-5df50544505e"],
};

// Create Weights
const weights = {
    watchPercentage: 10,
    ignored: -3,
    liked: 9,
    disliked: -9,
    shared: 5,
    subscribed: 10,
    skipped: -3
}

// Filter results 

const filterViewerPersonalization = (category) => {
    return new Promise((resolve, reject) => {
        fs.readFile('./data/viewerPersonalization.json', 'utf8', (err, data) => {
            if (err) reject(Error(err));
            let allViewerPersonalization = JSON.parse(data);
            let filteredData = allViewerPersonalization.filter((viewerPersonalization) => category.includes(viewerPersonalization.category));
            resolve(filteredData);
        })
    })
}

// Get 10 results

const getTopTenVideos = (data) => {
    return _.chain(data)
    .map((item) => [item.videoId, calculateWeight(item)])
    .groupBy((item) => item[0])
    .map((items) => {
        const totalWeights = _.sumBy(items, (item) => item[1]);
        const avgWeight = totalWeights / items.length;
        return {id: items[0][0], score: avgWeight}
    })
    .sortBy('score')
    .reverse()
    .take(10)
    .value()
}

// Calculation weights

const maxWeight = Math.max(...Object.values(weights));

const calculateWeight = (userData) => {
    const { watchPercentage, ignored, liked, disliked, shared, subscribed, skipped } = userData;
    const weight = (watchPercentage > 0) ? (weights.watchPercentage / watchPercentage) : 0 +
        (ignored ? weights.ignored / maxWeight : 0) + (liked ? weights.liked / maxWeight : 0) +
        (disliked ? weights.disliked / maxWeight : 0) + (shared ? weights.shared / maxWeight : 0) +
        (subscribed ? weights.subscribed / maxWeight : 0) + (skipped ? weights.skipped / maxWeight : 0);
    return (weight / (weights.watchPercentage + weights.ignored + weights.liked + weights.disliked + weights.shared + weights.subscribed + weights.skipped)) * 100;
};

// init()

const init = async () => {
    const filteredData = await filterViewerPersonalization(mockUser.category);
    console.log(getTopTenVideos(filteredData));
}

init();