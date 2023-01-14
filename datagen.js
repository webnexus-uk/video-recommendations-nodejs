/**
 * user: {
 *    id: string;
 *    name: string;
 * }
*/

const fs = require('fs');
const uuid = require('uuid').v4;

const users = [];

function generateUsers() {
    for (let i = 0; i < 50; i++) {
        users.push({
            id: uuid(),
            name: `User ${i}`,
        });
        if (i === 49) {
            fs.writeFileSync('data/users.json', JSON.stringify(users));
        }
    }
}

generateUsers();


/**
category: {
 *    id: string;
 *    name: string;
}
*/

const category = [];

function generateCategories() {
    for (let i = 0; i < 10; i++) {
        category.push({
            id: uuid(),
            name: `Category ${i}`,
        });
        if (i === 9) {
            fs.writeFileSync('data/category.json', JSON.stringify(category));
        }
    }
}

generateCategories();

/**
channel: {
 *    id: string;
 *    name: string;
 *    category: category;
}
*/

const channel = [];

function generateChannel() {
    for (let i = 0; i < 20; i++) {
        channel.push({
            id: uuid(),
            name: `Channel ${i}`,
            category: category[Math.random() * category.length | 0].id,
        });
        if (i === 19) {
            fs.writeFileSync('data/channel.json', JSON.stringify(channel));
        }
    }
}

generateChannel();

/**
 * video: {
 *    id: string;
 *    title: string;
 *    category: category;
 *    duration: string;
 *    channel: string;
 * }
 */

const video = [];

function generateVideo() {
    for (let i = 0; i < 2000; i++) {
        video.push({
            id: uuid(),
            title: `Video ${i}`,
            category: category[Math.random() * category.length | 0].id,
            duration: `${Math.random() * 1000 | 0}`,
            channel: channel[Math.random() * channel.length | 0].id,
        });
        if (i === 1999) {
            fs.writeFileSync('data/video.json', JSON.stringify(video));
        }
    }
}

generateVideo();

/**
 * viewerPersonalization: {
 *    id: string;
 *    userId: string;
 *    videoId: string;
 *    timestamp: number;
 *    watchLength: number;
 *    watchPercentage: number;
 *    ignored: boolean;
 *    liked: boolean;
 *    disliked: boolean;
 *    shared: boolean;
 *    subscribed: boolean;
 *    skipped: boolean;
 * }
*/

const viewerPersonalization = [];

function generateViewerPersonalization() {
    for (let i = 0; i< users.length; i++) {
        for (let j = 0; j < 500; j++) {
            let current_video = video[Math.random() * video.length | 0];
            let watchLength = Math.random() * Number(current_video.duration) | 0;
            viewerPersonalization.push({
                id: uuid(),
                userId: users[i].id,
                videoId: current_video.id,
                category: current_video.category,
                timestamp: Date.now(),
                watchLength,
                watchPercentage: (watchLength / Number(current_video.duration)) * 100,
                ignored: Math.random() > 0.5,
                liked: Math.random() > 0.5,
                disliked: Math.random() > 0.5,
                shared: Math.random() > 0.5,
                subscribed: Math.random() > 0.5,
                skipped: Math.random() > 0.5,
            });
            if (j === 499) {
                fs.writeFileSync('data/viewerPersonalization.json', JSON.stringify(viewerPersonalization));
            }
        }
    }
}

generateViewerPersonalization()