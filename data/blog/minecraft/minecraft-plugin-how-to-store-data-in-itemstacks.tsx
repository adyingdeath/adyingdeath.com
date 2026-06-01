import { md, CodeBlock, type BlogMeta } from "@/lib/blog";

export const meta: BlogMeta = {
  id: "hl0deq1imb0q",
  title: "[Minecraft Plugin] How to store data in itemstacks?",
  summary: "Use item.getItemMeta().getPersistentDataContainer() to get the getPersistentDataContainer. Then you can use set and set the data.",
  date: "2024-10-26 21:23",
};

export default function post() {
  return (
    <>
      {md`
Click [HERE](#summary) to directly see the code.

Recently when I was writing a plugin, I came across a problem. That is, how to store data in \`itemstack\`?

The plugin can enable players to store coordinates in a library. After that, other players can open a menu to browse the coordinates, all presented as a paper icon and can be clicked to perform some actions. Since the plugin needs to know which one the player has clicked, we must put some information in every paper item.

At first, I put information(ID of every coordinate, like \`#00000000\`) in the item's lore. However, there is a drawback to doing so: players opening the menu can see the ID. Although it is not a severe problem, I still think it is not a good solution. However, after searching for documents and information, I reach the solution.
      `}

      <h2>PersistentDataContainer</h2>

      {md`
From version 1.14, the class \`ItemMeta\` begins to extend class \`PersistentDataHolder\`. \`PersistentDataHolder\` is the key for us to store data in \`ItemMeta\`. \`PersistentDataHolder\` needs to implement a method like this \`getPersistentDataContainer()\`, which will return a custom tag container capable of storing tags on the object when it is invoked.

First, you need to get the \`ItemMeta\`, in the following way:
      `}

      <CodeBlock
        language="java"
        code={`// item is an object of class Itemstack
ItemMeta meta = item.getItemMeta();`}
      />

      {md`
Then you can get the \`PersistentDataContainer\` of the \`ItemMeta\`:
      `}

      <CodeBlock
        language="java"
        code={`PersistentDataContainer dataContainer = meta.getPersistentDataContainer();`}
      />

      {md`
Now, the \`dataContainer\` can be used to store data in the item.
      `}

      <CodeBlock
        language="java"
        code={`dataContainer.set(
    org.bukkit.NamespacedKey key,
    org.bukkit.persistence.PersistentDataType<T, Z> type,
    Z value
);`}
      />

      {md`
Let me explain the method. The explanation in API document writes this:

> Stores a metadata value on the \`PersistentDataHolder\` instance. This API cannot be used to manipulate minecraft data, as the values will be stored using your namespace. This method will override any existing value the \`PersistentDataHolder\` may have stored under the provided key.
      `}

      <CodeBlock
        language="java"
        code={`// key: To indicate the position you will store the data.
// type: The type of the data to be stored.
// value: The data you want to store.`}
      />

      <h3>key</h3>

      {md`
It is made up of two parts:
- namespace
- path

It should be like this: \`namespace:path\`.

namespace and path can both contain these characters:
- \`0123456789\` Numbers
- \`abcdefghijklmnopqrstuvwxyz\` Lowercase letters
- \`_\` Underscore
- \`-\` Hyphen/minus
- \`.\` Dot

The following characters are illegal in the namespace, but acceptable in the path:
- \`/\` Forward slash (directory separator)

*The information above is picked from [ Minecraft wiki](https://minecraft.wiki/w/Resource_location#Introduction)*
      `}

      <h3>type</h3>

      {md`
The type can be one of the following:
      `}

      <CodeBlock
        language="java"
        code={`- PersistentDataType.STRING
- PersistentDataType.BOOLEAN
- PersistentDataType.BYTE
- PersistentDataType.DOUBLE
- PersistentDataType.BYTE_ARRAY
- PersistentDataType.FLOAT
- PersistentDataType.INTEGER
- PersistentDataType.INTEGER_ARRAY
- PersistentDataType.LONG
- PersistentDataType.LONG_ARRAY
- PersistentDataType.SHORT
- PersistentDataType.TAG_CONTAINER
- PersistentDataType.TAG_CONTAINER_ARRAY`}
      />

      <h3>value</h3>

      {md`
It is what you want to store.
      `}

      <h2 id="summary">Summary</h2>

      {md`
Now, you can write the following code:
      `}

      <CodeBlock
        language="java"
        code={`// item is an object of class Itemstack
ItemMeta meta = item.getItemMeta();
PersistentDataContainer dataContainer = meta.getPersistentDataContainer();
// I use my code as an example
dataContainer.set(
    NamespacedKey.fromString("com.adyingdeath.coordinateslibrary:coord_id"),
    PersistentDataType.STRING,
    coordinate.getId()
);`}
      />

      {md`
The code above stores a STRING data into the item.

You can later get the data in the item somewhere else, like in a click event.
      `}

      <CodeBlock
        language="java"
        code={`// event is an object of class InventoryClickEvent.
// Get the ID stored in the item clicked
String id = event.getCurrentItem()
    .getItemMeta()
    .getPersistentDataContainer()
    .get(
        NamespacedKey.fromString("com.adyingdeath.coordinateslibrary:coord_id"),
        PersistentDataType.STRING
    );`}
      />

      {md`
Actually, in this way, not only can we store data in item, but also we can store data in other objects. You can check [PaperMC API](https://docs.papermc.io/paper/dev/pdc) for more information.
      `}
    </>
  );
}
