import React, { useEffect, useState } from 'react'

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in kilometers
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
}

function toRad(degrees) {
    return degrees * (Math.PI / 180);
}
export const Match = () => {

    const [coord, setCoord] = useState(null)
    useEffect(()=>{

        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    console.log('Latitude:', latitude);
                    console.log('Longitude:', longitude);
                    setCoord({ longitude: longitude, latitude: latitude })
                },
                (error) => {
                    console.error('Error getting location:', error.message);
                }
                );
                
            } else {
                console.log("no geo")
            }
        },[])
            useEffect(() => {
        if (coord) {
            console.log(calculateDistance(32.8781004, -6.8887306, 33.596390, -7.616058))
        }
    }, [coord])

    return (
        <div>Match</div>
    )
}
