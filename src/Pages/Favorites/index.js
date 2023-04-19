import { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, FlatList } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { FoodList } from "../../Components/Card";

import { getFavorites } from "../../Utils/storage";

export function Favorites() {

    const [recipes, setRecipes] = useState([]);
    const isFocused = useIsFocused()

    useEffect(()=>{

        let isActive = true

        async function getRecipes(){
            const result = await getFavorites('@appreceitas');
            if(isActive){
                setRecipes(result)
            }
        }

        if(isActive){
            getRecipes();
        }

        return()=>{
            isActive = false
        }
    },[isFocused])

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Favoritos</Text>

            {recipes.length === 0 && ( <Text>Nenhuma receita salva</Text>)}

            <FlatList
                data={recipes}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => <FoodList data={item} />}
                showsVerticalScrollIndicator={false} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f9ff',
        paddingTop: 36,
        paddingEnd: 14,
        paddingStart: 14
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 14,
        color: '#000',
        marginBottom: 4
    }
})
