import React, {memo, useState} from 'react';
import {View, Text, Image, StyleSheet, Pressable} from 'react-native';
import {COLORS, FONTS} from '../../../theme';
import {useSelectRoomContextProvider} from '../../../contexts/select-room';
import ChangeSvg from '../../../assets/channel.svg';
import {GestureResponderEvent} from 'react-native';
import {Modal} from '../../modal';
import {cursorPointer} from '../../../native/CursorPointer';

type ServerItemProps = {
  item: any;
  index: number;
};

type OnTouchStartProps = GestureResponderEvent;

export const Item = memo(({item, index}: ServerItemProps) => {
  const [textChange, setTextChange] = useState(false);
  const {setId} = useSelectRoomContextProvider();

  const [onHover, setOnHover] = useState(false);

  const onHoverIn = async () => {
    console.log('onHoverIn');
    await cursorPointer.cursor('hand');
    setOnHover(true);
  };

  const onHoverOut = async () => {
    await cursorPointer.cursor('arrow');
    setOnHover(false);
  };

  const onTouchStart = (props: OnTouchStartProps) => {
    console.log(props.nativeEvent);

    //@ts-ignore
    if (props.nativeEvent?.isRightButton) {
      setTextChange(true);
    }
    //@ts-ignore

    if (props.nativeEvent?.isLeftButton) {
      setTextChange(false);
    }
  };

  return (
    <View style={[styles.channelContent]}>
      <View style={styles.channelsItemDot} />
      <Pressable
        onHoverIn={onHoverIn}
        onHoverOut={onHoverOut}
        onTouchStart={onTouchStart}
        onPress={() => setId(index < 2 ? index : 0)}
        key={index}
        style={[
          styles.content,
          {
            backgroundColor: onHover ? '#35373C' : '#2B2D31',
          },
        ]}>
        <Image style={styles.channelContentIcon} source={ChangeSvg} />
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={styles.channelContentText}>
          {textChange ? item + 'mouse right' : item}
        </Text>
      </Pressable>
    </View>
  );
});

const channelsItemDotSize = 10;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: 270,
    minWidth: 200,
    backgroundColor: COLORS.grey_180,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 21,
    paddingVertical: 4,
    paddingLeft: 7,
    borderRadius: 5,
  },
  list: {},
  header: {
    position: 'relative',
    marginBottom: 12,
  },
  headerTop: {
    position: 'absolute',
    padding: 12,
    height: 51,
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  headerText: {
    color: COLORS.white,
    fontSize: 16,
    fontFamily: FONTS.Roboto.Bold,
  },
  headerImage: {
    flex: 1,
    width: 270,
    minWidth: 200,
    maxHeight: 200,
  },
  channelsItem: {
    marginVertical: 4,
  },
  channelsItemHeader: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  channelsItemDot: {
    height: channelsItemDotSize,
    width: channelsItemDotSize / 2,
    borderTopEndRadius: channelsItemDotSize / 2,
    borderBottomEndRadius: channelsItemDotSize / 2,
    backgroundColor: COLORS.white,
    marginRight: 4,
  },
  channelsItemText: {
    marginLeft: 12,
    marginVertical: 7,
    fontSize: 12,
  },
  channelsItemContent: {
    justifyContent: 'center',
  },
  channelContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  channelContentIcon: {
    marginRight: 7,
  },
  channelContentText: {
    fontSize: 14,
    fontFamily: 'GGSansBold.woff#gg sans',
    color: '#7A7E87',
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 7,
  },
  buttonWrapper: {
    paddingVertical: 4,
    paddingHorizontal: 4,
    backgroundColor: COLORS.grey_180,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    minHeight: 30,
    minWidth: 30,
    marginHorizontal: 2,
  },
  imageAvatar: {
    height: 36,
    width: 36,
    borderRadius: 18,
  },
  name: {
    fontSize: 14,
  },
  nickname: {
    fontSize: 12,
    // fontFamily: 'GGSans',
    color: '#b9b9b9',
  },
  icon: {
    height: 22,
    width: 22,
  },
});
