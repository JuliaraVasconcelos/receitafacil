import AsyncStorage from "@react-native-async-storage/async-storage";

//Buscar os favoritos 
// Salvar um novo favorito
//Remover um favorito da lista

export async function getFavorites(key){
    const favorites = await AsyncStorage.getItem(key)
    return JSON.parse(favorites) || [];
}

export async function saveFavorites(key, newItem) {
    let myFavorites = await getFavorites(key)

    let hasItem = myFavorites.some( item => item.id === newItem.id)

    if(hasItem){
        console.log('o item já está na lista');
        return;
    }

    myFavorites.push(newItem)

    await AsyncStorage.setItem(key, JSON.stringify(myFavorites))
    console.log('item salvo');

}

export async function removeItem(id) {
    let recipes = await getFavorites('@appreceitas')

    let myFavorites = recipes.filter( item =>{
        return (item.id !== id)
    })

    await AsyncStorage.setItem('@appreceitas', JSON.stringify(myFavorites))
    console.log('item deletado');
    return myFavorites;
}

export async function isFavorite(recipe) {
    let myRecipes = await getFavorites('@appreceitas')

    const favorites = myRecipes.find( item => item.id === recipe.id)

    if(favorites){
        return true;
    }
    return false
}