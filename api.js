import axios from 'axios'

const runConAPI = axios.create({ baseURL : 'https://be-runcon-bsm1jgj3f-millie-ellis-projects.vercel.app/api'})

export const getGroupPosts = (user_id) => {
    return runConAPI.get(`/posts/groups/${user_id}`)
    .then ((res) => {
        return res.data.posts
    })
}

export const getGroupsByUser = (user_id) => {
    return runConAPI.get(`/groups/user/${user_id}`)
    .then ((res) => {
        return res.data.groups
    })
}

export const getLocalGroups = () => {
    return runConAPI.get(`/groups`)
        .then((res) => {
            // Filter groups where distance_from_user_km is less than 4
            const localGroups = res.data.groups.filter(group => group.distance_from_user_km < 5);
            return localGroups;
        })
        .catch((error) => {
            console.error("Error fetching local groups:", error);
            return [];
        });
}

export const getFutureRunsByGroup = (group_id) => {
    return runConAPI.get(`/runs/group/${group_id}?future_runs=y`)
    .then ((res) => {
        return res.data.runs
    })
    .catch(error => {
        return [];
    });
}

export const getUpcomingRunForGroup = (group_id) => {
    return runConAPI.get(`/runs/upcoming/${group_id}`)
    .then ((res) => {
        return res.data.upcomingRun
    })
    .catch(error => {
        return [];
    });
}

export const getAllGroups = () => {
    return runConAPI.get(`/groups`)
    .then ((res) => {
        return res.data.groups
    })
    .catch(error => {
        return [];
    });
}