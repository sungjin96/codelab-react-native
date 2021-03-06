import AsyncStorage from "@react-native-async-storage/async-storage";
import _ from "lodash";

const KEY = "photo-logs";

async function read(key) {
  const data = await AsyncStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}

async function store(key, value) {
  if (typeof value !== "string") value = JSON.stringify(value);
  await AsyncStorage.setItem(key, value);
}

async function readAll() {
  return await read(KEY);
}

async function readById(id) {
  const data = await read(KEY);
  return _.find(data, element => element.id === id);
}

async function append(values) {
  const data = await read(KEY);
  data.push({
    ...values,
    id: new Date().getTime().toString(),
  });
  return await store(KEY, JSON.stringify(data));
}

export default {
  read, store, readAll, readById, append,
};


