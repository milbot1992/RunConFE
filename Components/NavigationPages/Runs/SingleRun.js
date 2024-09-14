import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { getRunById, getGroupById } from '../../../api';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-ico-material-design';

export default function SingleRun({ route }) {
    const { run_id, group_id } = route.params;
    const [singleRun, setSingleRun] = useState(null);
    const [singleGroup, setSingleGroup] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch run details
                const runData = await getRunById(run_id);
                setSingleRun(runData);

                // Fetch group details
                const groupData = await getGroupById(group_id);
                setSingleGroup(groupData);

                setTimeout(() => {
                    setIsLoading(false);
                }, 1000);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [run_id, group_id]);

    return (
        <>
            {isLoading ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F2F2F2' }}>
                    <Text>Loading...</Text>
                </View>
            ) : (
                singleRun && singleGroup && (
                    <ScrollView style={styles.container}>
                        {/* Banner */}
                        <View style={styles.bannerContainer}>
                            <Image source={{ uri: singleGroup.picture_url }} style={styles.groupImage} />
                            <View style={styles.bannerText}>
                                <Text style={styles.bannerTitle}>{`${singleGroup.group_name} Run`}</Text>                       
                                <Text style={styles.routeDescription}>{singleRun.route_name}</Text>
                                <Text style={styles.bannerInfo}>{`Date: ${new Date(singleRun.date).toLocaleDateString()}`}</Text>
                                <Text style={styles.bannerInfo}>{`Time: ${singleRun.time}`}</Text>
                                <Text style={styles.bannerInfo}>Meeting Point: {singleRun.meeting_point}</Text>
                            </View>
                        </View>

                        {/* Icons with Text */}
                        <View style={styles.divider} />
                        <View style={styles.iconContainer}>
                            <View style={styles.iconItem}>
                                <Icon name="man-walking-directions-button" color='gray' />
                                <Text style={styles.iconText}>{singleRun.distance} {singleRun.distance_unit} distance</Text>
                            </View>
                            <View style={styles.iconItem}>
                                <Icon name="good-mood-emoticon" color='gray' />
                                <Text style={styles.iconText}>10 attending</Text>
                            </View>
                            <View style={styles.iconItem}>
                                <Icon name="map-placeholder" color='gray' />
                                <Text style={styles.iconText}>Meeting Point</Text>
                            </View>
                        </View>
                        <View style={styles.divider} />

                        {/* Route Section */}
                        <Text style={styles.routeTitle}>Route:</Text>
                        <Text style={styles.routeInfo}>{singleRun.route_description}</Text>
                        <MapView
                            style={styles.map}
                            initialRegion={{
                                latitude: singleGroup.location[0],
                                longitude: singleGroup.location[1],
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                        >
                            {singleRun.waypoints && singleRun.waypoints.map(waypoint => (
                                <Marker
                                    key={waypoint._id}
                                    coordinate={{
                                        latitude: waypoint.latitude,
                                        longitude: waypoint.longitude,
                                    }}
                                    title={`Waypoint ${waypoint.sequence}`}
                                />
                            ))}
                        </MapView>
                    </ScrollView>
                )
            )}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: 'white',
    },
    bannerContainer: {
        width: '100%',
        backgroundColor: '#FFF',
        marginBottom: 20,
        marginTop: 20,
        flexDirection: 'row-reverse', 
        alignItems: 'center',
        paddingHorizontal: 20, 
    },
    groupImage: {
        width: 100, 
        height: 100,
        borderRadius: 100, 
        marginTop: 80,
        marginRight: 0, 
    },
    bannerText: {
        marginTop: 100,
        flex: 1, 
        justifyContent: 'center', 
        paddingRight: 20, 
    },
    bannerTitle: {
        fontSize: 21,
        fontWeight: 'bold',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        margin: 10
    },
    routeDescription: {
        fontSize: 20,
        marginBottom: 10
    },
    routeInfo: {
        marginHorizontal: 20,
        fontSize: 16,
        marginBottom: 20
    },
    bannerInfo: {
        fontSize: 14,
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 30,
        borderTopColor: '#E0E0E0',
        borderTopWidth: 1,
        borderBottomColor: '#E0E0E0',
        borderBottomWidth: 1,
        backgroundColor: 'white',
        marginHorizontal: 20,
        marginBottom:25
    },
    iconItem: {
        alignItems: 'center',
    },
    iconTextTitle: {
        fontSize: 15,
        marginTop: 5,
        fontWeight: 'bold',
        color: '#66B2B2',
    },
    iconText: {
        fontSize: 14,
        marginTop: 5,
    },
    routeTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingHorizontal: 10,
        paddingLeft: 20
    },
    map: {
        width: '90%',
        height: 300,
        borderRadius: 8,
        marginBottom: 20,
        marginLeft: 20
    },
});
