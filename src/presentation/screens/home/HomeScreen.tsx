import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {getPokemons} from '../../../actions/pokemons';
import {useInfiniteQuery, useQueryClient} from '@tanstack/react-query';
import {PokeballBg} from '../../components/ui/PokeballBg';
import {FlatList} from 'react-native-gesture-handler';
import {globalTheme} from '../../../config/theme/global-theme';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {PokemonCard} from '../../components/pokemons/PokemonCard';

export default function HomeScreen() {
  const {top} = useSafeAreaInsets();

  const queryClient = useQueryClient();
  // forma tradicional
  // const {isLoading, data: pokemons = []} = useQuery({
  //   queryKey: ['pokemons'],
  //   queryFn: () => getPokemons(0),
  //   staleTime: 1000 * 60 * 60,
  // });
  const {isLoading, data, fetchNextPage, isFetchingNextPage} = useInfiniteQuery(
    {
      queryKey: ['pokemons', 'infinite'],
      initialPageParam: 0,
      queryFn: async params => {
        const pokemons = await getPokemons(params.pageParam);

        pokemons.forEach(pokemon => {
          queryClient.setQueryData(['pokemon', pokemon.id], pokemon)
        });
        return pokemons;
      },

      getNextPageParam: (lastPage, pages) => pages.length,
      staleTime: 1000 * 60 * 60,
    },
  );

  return (
    <View style={globalTheme.globalMargin}>
      <PokeballBg style={styles.imgPosition} />
      <FlatList
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.3}
        onEndReached={() => {
          if (!isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        data={data?.pages.flat() ?? []}
        style={{paddingTop: top + 20}}
        keyExtractor={(pokemon, index) => `${pokemon.id}-${index}`}
        numColumns={2}
        ListHeaderComponent={() => <Text variant="displayMedium">Pokédex</Text>}
        renderItem={({item}) => <PokemonCard pokemon={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  imgPosition: {
    position: 'absolute',
    top: -100,
    right: -100,
  },
});
