import { useLayoutEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView, Image, Modal, Share } from "react-native";
import { useRoute,useNavigation } from "@react-navigation/native";

import { Entypo, AntDesign, Feather } from "@expo/vector-icons";

import { Ingredients } from "../../Components/Ingredients";
import { Instructions } from "../../Components/Instructions";
import { VideoView } from "../../Components/Video";

import { isFavorite, saveFavorites, removeItem } from "../../Utils/storage";

export function Detail() {
    const route = useRoute();
    const navigation = useNavigation();
    const [showVideo, setShowVideo] = useState(false)
    const [favorite, setFavorite] = useState(false)

    useLayoutEffect(()=>{

        async function getStatusFavorites(){
            const recipeFavorite = await isFavorite(route.params?.data)
            setFavorite(recipeFavorite)
        }
        getStatusFavorites();

        navigation.setOptions({
            title: route.params?.data ? route.params?.data.name : 'Detalhes da receita', 
            headerRight: ()=>(
            <Pressable onPress={() => handleFavoriteRecipe(route.params?.data)}>
            {favorite ? (
                        <Entypo
                            name='heart' size={28} color='#ff4141'
                        />
                    ) : (<Entypo
                        name='heart-outlined' size={28} color='#ff4141'
                    />)}
            </Pressable>
            )
        })
        },[navigation, route.params?.data, favorite])

        async function handleFavoriteRecipe(recipe){
            if(favorite){
                await removeItem(recipe.id)
                setFavorite(false)
            } else{
                await saveFavorites('@appreceitas', recipe)
                setFavorite(true)
            }
        }

        function handleOpenVideo(){
            setShowVideo(true);
        }

        async function shareRecipe(){
            try {
                await Share.share({
                    message: `Receita: ${route.params?.data.name}`
                })
            } catch (error) {
                console.log(error);
            }
        }
    return (
        <ScrollView contentContainerStyle={{paddingBottom: 14}} style={styles.container} showsVerticalScrollIndicator={false}>
            <Pressable onPress={handleOpenVideo}>

                <View style={styles.playIcon}>
                    <AntDesign name="playcircleo" size={52} color='#fafafa'/>
                </View>

                <Image 
                source={{uri: route.params?.data.cover}}
                style={styles.cover}/>
            </Pressable>

            <View style={styles.headerDetails}>
                <View>
                    <Text style={styles.title}>{route.params?.data.name}</Text>
                    <Text style={styles.ingredients}>Ingradientes ({route.params?.data.total_ingredients})</Text>
                </View>

                <Pressable onPress={shareRecipe}>
                    <Feather name="share-2" size={24} color='#121212'/>
                </Pressable>

            </View>
        {route.params?.data.ingredients.map((item)=>(<Ingredients key={item.id} data={item}/>))}

            <View style={styles.instructionsArea}>
                <Text style={styles.logo}>Modo de Preparo</Text>
                <Feather name="arrow-down" size={24} color='#fff'/>
            </View>
        {route.params?.data.instructions.map((item, index) => (<Instructions key={item.id} data={item} index={index}/>))}


        <Modal visible={showVideo} animationType="slide">
            <VideoView
            handleClose={() => setShowVideo(false)}
            videoUrl={route.params?.data.video}/>
        </Modal>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f3f9ff',
        paddingTop: 14,
        paddingEnd: 14,
        paddingStart: 14
    },
    cover:{
        height: 200,
        borderRadius: 14,
        width: '100%'
    },
    playIcon:{
        position: 'absolute',
        zIndex: 9,
        top: 0, left: 0, right: 0, bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title:{
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 14,
        color: '#000',
        marginBottom: 4
    },
    ingredients:{
        marginBottom: 4
    },
    headerDetails:{
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        marginBottom: 14
    },
    instructionsArea: {
        width: '100%',
        backgroundColor: '#4cbe6c',
        alignSelf: "flex-start",
        padding: 8,
        paddingLeft: 16,
        paddingRight: 16,
        borderRadius: 8,
        marginBottom: 8,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    logo: {
        fontSize: 18,
        fontWeight: "bold",
        color: '#fff',
        paddingRight: 14
    }
})
