import HomeScreen from "@/components/HomeScreen";
import { User } from "@/context/user/UserContext";
import getUser from "@/hooks/getUserDataFromToken";
import {createClient} from "redis"

export default async function Home() {
  const client = await createClient().on('error', error => console.log('Redis Client Error', error)).connect();
  let data: User | null = null
  await client.del('newUser')
  if(await client.get('newUser') === null){
    data = await getUser()
    await client.set('newUser', JSON.stringify(data))
  } else {
    const userString = await client.get('newUser')
    if(!userString){
      await client.del('newUser')
    }
    if(userString){
      data = JSON.parse(userString) as User;
    }
  }

  // console.log(data)

  await client.quit();
  return (
    <HomeScreen userCurrent={data}/>
  );
}
