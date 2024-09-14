import axios from 'axios'

const runConAPI = axios.create({ baseURL : 'https://be-runcon-2l3z744zu-millie-ellis-projects.vercel.app/api'})

export const getGroupPosts = (user_id) => {
    return runConAPI.get(`/posts/groups/${user_id}`)
    .then ((res) => {
        return res.data.posts
    })
}

export const postPost = (newPost) => {
    return runConAPI.post(`/posts`, newPost)
};

export const getGroupsByUser = (user_id) => {
    return runConAPI.get(`/groups/user/${user_id}`)
    .then ((res) => {
        return res.data.groups
    })
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

export const getGroupsNotInUserGroups = (user_id) => {
    return runConAPI.get(`/groups/usernotin/${user_id}`)
    .then ((res) => {
        return res.data.groups
    })
    .catch(error => {
        return [];
    });
}

export const getGroupById = (group_id) => {
    return runConAPI.get(`/groups/group/${group_id}`)
    .then ((res) => {
        return res.data.group
    })
    .catch(error => {
        return [];
    });
}

export const getPicturesByGroup = (group_id) => {
    return runConAPI.get(`/pictures/${group_id}`)
    .then ((res) => {
        return res.data.pictures
    })
    .catch(error => {
        return [];
    });
}

export const getRunsByGroup = (group_id, futureRuns = 'y', user_id) => {
    return runConAPI.get(`/runs/group/${group_id}?future_runs=${futureRuns}&user_id=${user_id}`)
    .then((res) => {
        return res.data.runs;
    })
    .catch((error) => {
        console.error('Error fetching runs:', error);
        return [];
    });
};

export const getRunsByUser = (user_id, futureRuns) => {
    return runConAPI.get(`/runs/user/${user_id}?future_runs=${futureRuns}`)
    .then((res) => {
        return res.data.runs;
    })
    .catch((error) => {
        console.error('Error fetching runs:', error);
        return [];
    });
};

export const getRunById = (run_id) => {
    return runConAPI.get(`/runs/run/${run_id}`)
    .then((res) => {
        return res.data.run;
    })
    .catch((error) => {
        console.error('Error fetching run:', error);
        return [];
    });
};

export const postUserAttendingRun = (userRunToBeAdded) => {
    return runConAPI.post(`/runs/users`, userRunToBeAdded)
};


export const deleteUserAttendingRun = (user_id, run_id) => {
    return runConAPI.delete(`/runs/${run_id}/users/${user_id}`)
};

export const getChatsByUser = (user_id) => {
    return runConAPI.get(`/chats/${user_id}`)
    .then ((res) => {
        return res.data.chats
    })
}

export const getMessagesByChat = (chat_id) => {
    return runConAPI.get(`/messages/${chat_id}`)
    .then ((res) => {
        return res.data.messages
    })
}

export const postMessage = (newMessage) => {
    return runConAPI.post(`/messages`, newMessage)
};

export const deleteMessage = (message_id) => {
    return runConAPI.delete(`/messages/${message_id}`)
};

export const getLatestMessageFromChat = (chat_id) => {
    return runConAPI.get(`/messages/latest/${chat_id}`)
    .then ((res) => {
        return res.data
    })
}

export const getUserById = (user_id) => {
    return runConAPI.get(`/users/user/${user_id}`)
    .then((res) => {
        return res.data.user;
    })
    .catch((error) => {
        console.error('Error fetching user:', error);
        return [];
    });
};

export const patchUserById = (user_id, patchedUser) => {
    return runConAPI.patch(`/users/${user_id}`, patchedUser)
}