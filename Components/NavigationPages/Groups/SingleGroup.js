import React, { useEffect, useState } from 'react';
import { getGroupById } from '../../../api'
import { View, FlatList, Text } from 'react-native';
import SingleGroupBanner from './SingleGroupBanner';
import SingleGroupInfo from './SingleGroupInfo';
import SingleGroupPhotos from './SingleGroupPhotos';
import SingleGroupRuns from './SingleGroupRuns';


export default function SingleGroup({route, navigation}) {
    const user_id = 1
    const {group_id, user_joined_group} = route.params

    const [group, setGroup] = useState({})
    const [singleLoading, setSingleLoading] = useState(true)
    const [renderDelayed, setRenderDelayed] = useState(false);

    useEffect(() => {
        if (!singleLoading) {
            setTimeout(() => {
                setRenderDelayed(true);
            }, 1000);
        }
    }, [singleLoading]);

    useEffect(() => {
        getGroupById(group_id)
        .then((group) => {
            setGroup(group);
            setSingleLoading(false)
        })
        .catch((err)=>{
            console.log(err)
        });
    }, [group_id]);

    return (
        <FlatList
            style={{ flex: 1, marginTop: 50 }}
            ListHeaderComponent={() => (
                <>
                {!renderDelayed && (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F2F2F2' }}>
                        <Text>Loading...</Text>
                    </View>
                )}
                {renderDelayed && (
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <SingleGroupBanner group={group}/>
                    <SingleGroupInfo group={group} user_joined_group={user_joined_group}/>
                    <SingleGroupPhotos group={group}/>
                    <SingleGroupRuns navigation={navigation} group={group} />
                    </View>
                )}
                </>
            )}
        />
    );
}
