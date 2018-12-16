using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class LanguageButtons : MonoBehaviour {

	public Button chineseButton, germanButton, englishButton;
	private GameObject facesPanel;
	private Image[] foundImages;

	void Start () {
		chineseButton.onClick.AddListener(delegate { ShowFaces("Chinese"); });
		germanButton.onClick.AddListener(delegate { ShowFaces("German"); });
		englishButton.onClick.AddListener(delegate { ShowFaces("English"); });

		facesPanel = this.gameObject;
		foundImages = facesPanel.GetComponentsInChildren<Image>(true);
	}

	void ShowFaces(string language)
	{
		for (int i = 0; i < foundImages.Length; i++)
		{
			GameObject image = foundImages[i].gameObject;
			if (image.tag == language)
			{
				image.SetActive(true);
			}
			else
			{
				image.SetActive(false);
			}
		}
	}
}
