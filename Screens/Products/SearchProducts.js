import React from 'react';
import { ViewBase,StyleSheet , Dimensions } from 'react-native';
import { Content , Left , Body , ListItem , Thumbnail , Text, View } from 'native-base';

var {width} = Dimensions.get("window")

const SearchedProduct = (props) => {

    const {productFiltered}=props;

    return (
        <Content style={{ width:width }}>
            {productFiltered.length > 0 ? (
                productFiltered.map((item) => (
                    <ListItem
                    onPress={() => {
                        props.navigation.navigate("Product Detail",{item:item})
                    }}
                    key={item._id}
                    avatar
                    >
                        <Left>
                            <Thumbnail
                             source={{
                                uri: item.image ? 
                                  item.image : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png"
                              }}
                            />
                        </Left>
                        <Body>
                            <Text>{item.name}</Text>
                            <Text note>{item.description}</Text>
                        </Body>
                    </ListItem>
                ))
            ) : (
                <View style={StyleSheet.center}>
                    <Text style={{alignSelf:"center"}}>
                        No Product the selected criteria
                    </Text>
                </View>
            )}
        </Content>
    )
}

const styles = StyleSheet.create({
    center:{
        justifyContent:"center",
        alignItems:"center"
    }
});

export default SearchedProduct;