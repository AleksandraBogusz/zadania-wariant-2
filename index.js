const axios = require('axios');

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';
const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

// funkcja uruchamiająca rozwiązania dla wszystkich podpunktów
const task = async () => {
    const posts = await fetchData(POSTS_URL);
    const users = await fetchData(USERS_URL);

    // #1 - userzy połączeni z postami
    const groupedPosts = groupBy(posts, 'userId');
    const usersWithPosts = task1(users, groupedPosts);
    console.log(usersWithPosts);

    // #2 - ilość postów na usera
    const postCount = task2(usersWithPosts);
    console.log(postCount);

    // #3 - nieunikalne tytuły postów
    const postsGroupedByTitle = groupBy(posts, 'title');
    const nonUniqueTitles = task3(postsGroupedByTitle);
    console.log(nonUniqueTitles);

    // #4 - znajdź najbliższego sąsiada
    const usersPositions = users.map(user => ({ id: user.id, y: user.address.geo.lat, x: user.address.geo.lng }));
    const nearestNeighbours = task4(usersPositions);
    console.log(nearestNeighbours);
}


const task1 = (users, groupedPosts) => users.map(user => {
        const { id }  = user;
        if (groupedPosts[id] !== undefined) {
            user.posts = groupedPosts[id]
        }
        return user;
    });

const task2 = (usersWithPosts) => usersWithPosts.map(ob => `${ob.username} napisał ${ob.posts?.length} postów.`);
const task3 = (postsGroupedByTitle) => Object.entries(postsGroupedByTitle).filter(o => o[1]?.length > 1).map(o => o[0]);
const task4 = (points) => points.map(p => findNearestNeighbour(p, points))

// helper function do pobierania danych
const fetchData = async (url) => {
    const response = await axios.get(url);
    return response.data;
}

// funkcja grupująca obiekty w tablicy @data po @property
const groupBy = (data, property) => {
    const reducer = (acc, curr) => {
        const prop = curr[property]
        const result = [...(acc[prop] || []), curr]
        acc[prop] = result;
        return acc;
    }

    return data.reduce(reducer, {});
}

// funkcja znajdująca najbliższy sąsiadujący punkt opisany przez @point znajdujący się posród @points
const findNearestNeighbour = (point, points) => {
    const distance = (p1, p2) => Math.hypot(p1.x - p2.x, p1.y - p2.y);
    const reducer = (acc, curr) => {
        const d = distance(point, curr);
        if (d <= acc.distance && point.id !== curr.id) {
            acc.nearestPoint = curr;
            acc.distance = d;
        }

        return acc;
    }
    return points.reduce(reducer, { point, distance: Number.MAX_VALUE })
}

task();

module.exports = {
    task1,
    task2,
    task3,
    task4
}
