# Building Food Baskets

The `basket.N.json` files in assets that correspond to each of the partial tree indexes were created semi manually with the following command line scripts. Until I write a better script in `noode.js` or `R` to do this more consistently, here are some notes on how to recreate the files:

## create a directory to do the work

Everything here assumes that you're doing this in the root directory of the adams apple project that's a sibling directory to a clone of the images repo.

```
mkdir assets
cd assets
```

## create the baskets directory in assets

Copy over all of the partial tree index files from `src/assets`. Create a numbered directory for each index file with an `ids` file containing all of the food ids in that partial -- one line per id.

```
mkdir baskets
cd baskets
cp ../../src/assets/meta/indexed-tree.* .
rm indexed-tree.json
for file in *.json; do a=${file#*.};b=${a%.*};mkdir $b;done
for file in *.json; do a=${file#*.};b=${a%.*};cat $file |tr "," "\n"|sed 's/^.[^:]*://'|tr -cd "0123456789\n">"${b}/ids";done
```

## create a directory with all of the ids

```
cd ..
mkdir all
for file in baskets/*.json; do cat $file |tr "," "\n"|sed 's/^.[^:]*://'|tr -cd "0123456789\n";done|sort|uniq >all/ids
```

## create a directory for the individual json files

Copy over all of the json metadata files from the images repo -- poorly named `id.jpg` in the `photos` directory. Rename them to `id.json` in the copy process. Remove `.jpg` from the end of all of the ids in the contents of all of the json files (feed me jefferson used the full image file name as the id including the extension -- we're excluding the extension from the id).

```
mkdir individual
for id in `cat all/ids`; do cp ../../images/photos/${id}.jpg individual/${id}.json;done
cd individual/
sed -i.bk 's/\.jpg//g' *.json
rm *.json.bk
```

remove the tags (we aren't using them for now and they're just making the load bigger)

```
sed -i.bk 's/,".[^"]*Tags":\[[^]]*\]//g' *.json
rm *.json.bk
```

```
cd ..
```

## concatenate json files to form baskets

```
cd baskets/
for basket in `ls index*.json|sed 's/[^0-9]//g'`; do (echo -n "{";for id in `cat $basket/ids`;do echo -n '"';echo -n $id;echo -n '":';cat ../individual/${id}.json;echo -n ',';done;echo -n "}")>basket.${basket}.json;done
```

## manually drop the extra comma at the end of every basket file

```
sed -i.bk 's/,}/}/' basket.*.json
rm *.json.bk
```

```
{
...
}
,}
```
