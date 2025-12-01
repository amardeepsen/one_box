import { FlatList, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React, { useEffect } from 'react';
import HeaderComp from "./../components/HeaderComp";
import { useDispatch, useSelector } from 'react-redux';
import { fetchItem } from '../redux/slices/productSlice';

const HomeScreens = ({ navigation }) => {

  const dispatch = useDispatch();

  const userData = useSelector((state) => state.auth.user);

  // SELECTOR
  const { products, loading, error, total } = useSelector((state) => state.products);

  // FIRST CALL
  useEffect(() => {
    dispatch(fetchItem({ limit: 10, skip: 0 }));
  }, []);

  // PAGINATION HANDLER
  const loadMoreData = () => {
    if (!loading && products.length < total) {
      dispatch(fetchItem({ limit: 10, skip: products.length }));
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.card}>
        <Text style={styles.title}>{item.id}</Text>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>₹ {item.price}</Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      
      {/* Header Component */}
      <HeaderComp
        firstName={userData?.firstName}
        lastName={userData?.lastName}
        image={userData?.image}
        navigation={navigation}
      />

      {/* ERROR */}
      {error && (
        <Text style={{ color: "red", textAlign: "center", marginVertical: 20 }}>
          {error}
        </Text>
      )}

      {/* PRODUCT LIST */}
      <FlatList
        data={products}
        keyExtractor={(item,index) => item.id.toString()+index}
        renderItem={renderItem}

        // ⭐ Pagination Trigger
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.5}

        // ⭐ Bottom Loader
        ListFooterComponent={
          loading ? (
            <ActivityIndicator
              size="large"
              color="purple"
              style={{ marginVertical: 20 }}
            />
          ) : null
        }
      />

    </View>
  );
};

export default HomeScreens;

const styles = StyleSheet.create({
  card: {
    padding: 15,
    backgroundColor: "#f2f2f2",
    marginVertical: 8,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
  },
  price: {
    fontSize: 14,
    marginTop: 5,
    color: "#333",
  },
});
