import React from "react";
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface HistoryModalProps {
  visible: boolean;
  history: string[];
  onSelectItem: (item: string) => void;
  onClearHistory: () => void;
  onClose: () => void;
}

const HistoryModal: React.FC<HistoryModalProps> = ({
  visible,
  history,
  onSelectItem,
  onClearHistory,
  onClose,
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.modalContainer}
        activeOpacity={1}
        onPress={onClose} 
      >
        <TouchableOpacity
          style={styles.modalContent}
          activeOpacity={1}
          onPress={() => {}} 
        >
          <View style={styles.historyHeader}>
            <Text style={styles.historyTitle}>Histories:</Text>
            <TouchableOpacity onPress={onClearHistory}>
              <Text style={styles.clearHistoryText}>Clear</Text>
            </TouchableOpacity>
          </View>
          {history.length > 0 ? (
            <FlatList
              data={history}
              keyExtractor={(item, index) => `${item}-${index}`}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => onSelectItem(item)}>
                  <Text style={styles.historyText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          ) : (
            <Text style={styles.emptyHistoryText}>No search history.</Text>
          )}
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end", 
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "100%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    alignItems: "center",
  },
  historyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
    width: "100%",
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  clearHistoryText: {
    color: "red",
  },
  historyText: {
    padding: 8,
    marginVertical: 4,
    borderRadius: 8,
    width: "100%",
    textAlign: "center",
  },
  emptyHistoryText: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 16,
    color: "#888",
  },
  closeModalButton: {
    marginTop: 16,
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  closeModalButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default HistoryModal;
