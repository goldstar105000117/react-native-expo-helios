import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Header from "./components/Header"
import DirectorNote from "./components/DirectorNote"
import EditorialCard from "./components/EditorialCard"
import Interviews from "./components/Interviews"
import MusicCard from "./components/MusicCard"
import Footer from "./components/Footer"
import Carousel from "react-native-reanimated-carousel";
import { useWindowDimensions } from "react-native";
import type { ICarouselInstance } from "react-native-reanimated-carousel";
import { fetchS3Object, getSignedUrl } from '@/s3-utils';
import CombinedEffect from './components/CombinedEffect';

export default function HomeScreen() {
  const sliderImageList = ['wayward.png', 'finalDemo.jpeg', 'editorial.jpeg']

  const [sliderData, setSliderData] = useState<string[]>([]);
  const [interviewList, setInterviewList] = useState<object[]>([]);
  const [interviewsData, setInterviewsData] = useState<object[]>([]);

  useEffect(() => {
    const fetchImageUrls = async () => {
      const sliderImageUrlList: string[] = [];

      try {
        const interviewListUrl = await getSignedUrl('heliosassets', 
          'interviewList.json'
        );
        setInterviewList(await fetchS3Object(interviewListUrl));

      } catch (error) {
        console.error('Error fetching data: ', error);
      }

      for (const item of sliderImageList) {
        const imageUrl = await getSignedUrl('heliosassets', item);
        sliderImageUrlList.push(imageUrl);
      }
      setSliderData(sliderImageUrlList);
    };

    fetchImageUrls();
  }, []);

  useEffect(() => {
    const fetchImageUrls = async () => {
      const interviewImageUrlList: object[] = [];

      if (interviewList.length) {
        for (const item of interviewList) {
          const imageUrl = await getSignedUrl('heliosassets', item.imageUrl);
          interviewImageUrlList.push({ id: item.id, title: item.title, author: item.author, imageUrl: imageUrl, description: item.description });
        }
      }

      setInterviewsData(interviewImageUrlList);
    };

    fetchImageUrls();
  }, [interviewList]);

  const [activeIndex, setActiveIndex] = useState(0);
  const totalSlides = sliderImageList.length;

  const windowWidth = useWindowDimensions().width;
  const ref = React.useRef<ICarouselInstance>(null);
  const baseOptions = ({
    vertical: false,
    width: windowWidth,
    height: 675,
  } as const);

  const setDots = (targetIndex: number) => {
    const currentIndex = ref.current?.getCurrentIndex() || 0;
    const steps = (targetIndex - currentIndex + totalSlides) % totalSlides;
    if (steps < totalSlides / 2) {
      Array.from({ length: steps }).forEach(() => ref.current?.next());
    } else {
      Array.from({ length: totalSlides - steps }).forEach(() => ref.current?.prev());
    }
  };
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <CombinedEffect>
          <ScrollView style={styles.container}>
            <View style={styles.mainContainer}>
              <Header />
              <Carousel
                {...baseOptions}
                loop={true}
                ref={ref}
                style={{ width: "100%" }}
                autoPlay={false}
                data={sliderData}
                pagingEnabled={true}
                onSnapToItem={index => setActiveIndex(index)}
                renderItem={({ item }) => (
                  <View style={styles.slide}>
                    {item && (
                      <ImageBackground source={{ uri: item }} style={styles.backgroundImage}>
                        <Text style={styles.seriestitle}>MOTION PICTURE SERIES</Text>
                        <Text style={styles.seriesTitle}>Children of the Sea</Text>
                        <View style={styles.contentContainer}>
                          <TouchableOpacity style={styles.button} onPress={() => console.log('click button')}>
                            <Text style={styles.buttonText}>Go to Episode 1</Text>
                          </TouchableOpacity>
                          <Text style={styles.description}>We venture into sea life on the coasts in India.</Text>
                        </View>
                      </ImageBackground>
                    )}
                  </View>
                )}
              />
              <View style={styles.pagination}>
                {Array.from({ length: totalSlides }).map((_, i) => (
                  <TouchableOpacity key={i} onPress={() => setActiveIndex(i)}>
                    <View style={[styles.dot, activeIndex === i && styles.activeDot]} />
                  </TouchableOpacity>
                ))}
              </View>
              <DirectorNote
                title={'Director’s Note'}
                content={'I will answer one question - what is the essence of this publication; in other words, the question of what this publication will grow to become.'}
              />
              <EditorialCard
                header={'Editorial'}
                title={'Directing your First Film'}
                subtitle={'Written by Arya'}
                content={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at nisl sodales, dapibus velit id, convallis risus.'}
                headerIcon={'pen.png'}
                contentImage={'demoImage.jpeg'}
                nextIcon={'next.png'}
              />
              <Interviews interviewsData={interviewsData} />
              <MusicCard
                header={'Music'}
                title={'Transcendence'}
                type={'EXTENDED PLAY'}
                headerIcon={'piano.png'}
                contentIcon={'music.png'}
              />
              <Footer />
            </View>
          </ScrollView>
        </CombinedEffect>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F2327'
  },
  mainContainer: {
    paddingBottom: 200,
  },
  wrapper: {
  },
  slide: {
    height: 675,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center'
  },
  backgroundImage: {
    width: '100%',
    height: 675,
    paddingTop: 58,
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50
  },
  seriesTitle: {
    flex: 1,
    fontFamily: 'CorbenRegular',
    fontSize: 39,
    color: '#FFFFFF',
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 49,
    marginTop: 10,
    letterSpacing: -0.24
  },
  seriestitle: {
    fontFamily: 'IMFell',
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 34,
    letterSpacing: -0.24,
    marginBottom: 10
  },
  button: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 9,
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '400'
  },
  description: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    marginTop: 40
  },
  pagination: {
    width: '100%',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
    marginTop: -25
  },
  dot: {
    backgroundColor: 'transparent',
    borderWidth: 0.5,
    borderColor: '#FFFFFF',
    width: 9,
    height: 9,
    borderRadius: 5,
    marginLeft: 7,
    marginRight: 7,
    marginTop: 7,
    marginBottom: 7,
  },
  activeDot: {
    backgroundColor: '#FFFFFF',
    width: 9,
    height: 9,
    borderRadius: 4,
    marginLeft: 7,
    marginRight: 7,
    marginTop: 7,
    marginBottom: 7,
  },
  circle: {
    position: 'absolute',
    bottom: -30,
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 255, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleTouch: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wave: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
});