import { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import api from "../../Services/api";
import { FoodList } from "../../Components/Card";

export function Search() {

    const route = useRoute();
    const [recipes, setRecipes] = useState([])

    useEffect(()=>{
        async function fetchRecipes(){
            const response = await api.get(`/foods?name_like=${route.params?.name}`)
            setRecipes(response.data)
        }
        fetchRecipes();

    })

    return (
        <View style={styles.container}>
            <FlatList
                data={recipes}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => <FoodList data={item} />}
                showsVerticalScrollIndicator={false} 
                ListEmptyComponent={()=> <Text style={styles.title}>Receita não encontrada</Text>}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f9ff',
        paddingTop: 14,
        paddingStart: 14,
        paddingEnd: 14
    },
    title: {
        fontSize: 16,
        marginTop: 14,
        color: '#000',
        marginBottom: 4
    }
})
