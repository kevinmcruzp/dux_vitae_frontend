import { useRouter } from "next/router";
import Link from 'next/link'

//Lista los usuarios<>
{Data.map((user) => {
<>
<Text>
{user.name}
</Text>

<Link href={{
            pathname: "/user/update",
            query: { id: user.id }
           }} passHref>
asdasdasd
</Link>
</>;
})}

//Recuperar el id en la ruta de actualizar el usuario
const {query:{id}} = router;
