import { StyleSheet, Dimensions, Platform } from 'react-native';

// Global styles 
export const globalStyles = StyleSheet.create({
	persianFontNormal: {
		fontFamily: 'IRANSans'
	},
  	linearGradient: {
		flex: 1,
		opacity: 0,
		borderRadius: 5
  	},
  	container: {
		flex: 1,
  	    backgroundColor: '#ffffff'
  	},
  	navBar: {
  		backgroundColor: '#212552',
  		elevation: 0,       //remove shadow on Android
      shadowOpacity: 0,   //remove shadow on iOS
  	},
  	navBarTitle: {
		color: '#ffffff',
		fontFamily: 'IRANSans',
		fontWeight: '200'
  	},
  	sliderWrapper: {
    height: 250, width: '100%'
	},
	tabBarStyle: {
		height: 60,
	},
	gridWrapper: {
		flex: 1,
	}
});

// Form styles
export const formStyles = StyleSheet.create({
   StyleForm : {
       padding: 20
   },
    item : {
        borderRadius : 5,
        marginBottom:10,
        paddingRight:10,
        paddingLeft: 10
    },
    input : {
        textAlign: 'center',
        fontFamily: 'IRANSans',
        fontSize:14
    },
    inputRTL: {
        textAlign: 'right',
        fontFamily: 'IRANSans',
        fontSize:14
    },
    submitButton: {
        borderRadius: 5,
        backgroundColor : '#0070c9',
        marginRight: 20
    },
    cancelButton: {
        borderRadius: 5,
        backgroundColor : '#0070c9',
    },
    submitText: {
       fontSize : 16,
       fontFamily: 'IRANSans',
       paddingTop: 10
    },
    error: {
        fontFamily: 'IRANSans',
        fontSize:12 ,
        color : '#ed2f2f',
        marginBottom: 10
    }
});

export const HomeStyles = StyleSheet.create({
  container: {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
        flexDirection : 'row'
    },
    button: {
        borderRadius: 5,
        backgroundColor : '#0070c9',
        marginRight: 20
    },
    buttonText: {
        borderRadius: 5,
        backgroundColor : '#0070c9',
        marginRight: 20
    }
});

export const splashStyles = StyleSheet.create({
  container: {
        flex : 1
    },
    main: {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
        flexDirection : 'row'
    },
    loading: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: 80
   }
});

export const apStyles = StyleSheet.create({
    apText: {
        textAlign: 'left',
        fontFamily: 'IRANSans'
    },
    circle: {
        width: 15,
        height: 15,
        borderRadius: 25
    },
    timeItem: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: 10,
        paddingLeft: 10,
        marginRight: 10,
        marginLeft: 10,
        borderRadius: 5,
        color: '#ffffff',
        fontFamily: 'IRANSans'
    }
});

export const patientProfileStyles = StyleSheet.create({
    circle: {
        width: 15,
        height: 15,
        borderRadius: 25
    }
});

export default styles = {
    globalStyles,
    formStyles,
    HomeStyles,
    apStyles,
    patientProfileStyles,
};