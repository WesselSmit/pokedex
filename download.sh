#!/bin/bash

# script to download all pokémon images from https://www.pokemon.com/us/pokedex/
# script is synchronous so it takes a while to run (depending on $last_pokemon_index)


# config
target_dir=public/pokemons # directory to save images
last_pokemon_index=898 # number of pokémons available (also see last pokémon id on https://www.pokemon.com/us/pokedex/)
index_length=3 # required char length of indexes


# ensure target dir exists
if [ ! -d $target_dir ]; then
  mkdir -p $target_dir;
fi


# get and save images
for i in $(seq -f "%0${index_length}g" 1 $last_pokemon_index) # loop and format (pad) all indexes (1 becomes 001 with $index_length=3)
do
  curl -o ${target_dir}/$i.png https://assets.pokemon.com/assets/cms2/img/pokedex/full/${i}.png -s
done


echo "SUCCES: downloaded all images in ${SECONDS} seconds"