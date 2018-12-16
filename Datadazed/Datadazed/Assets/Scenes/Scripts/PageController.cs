using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class PageController : MonoBehaviour {

	public GameObject[] panelPages;
	public Button seeWhyButton;
	

	// Use this for initialization
	void Start () {
		seeWhyButton.onClick.AddListener(() => SwitchPanelTask(0,1));
	}
	
	void SwitchPanelTask(int current, int next)
	{
		panelPages[current].SetActive(false);
		panelPages[next].SetActive(true);
	}
}
